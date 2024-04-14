import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { KafkaMessage } from 'kafkajs';
import { SUBTOPIC } from '@/domain/enums/subtopic.enum';
import { DatabaseService } from '@/storage/storage.service';
import { ConfigService } from '@nestjs/config';
import { ALERTTYPE } from '@/domain/enums/alert.enum';

@Injectable()
export class Consumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly databaseSerive: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const deviceTopics: RegExp[] = [/^device1-.+/i, /^device2-.+/i]; //Change this to the real devices hostname or main mqtt topic
    await this.consumerService.consume({
      topic: { topics: deviceTopics },
      config: { groupId: 'server-consumer' },
      onMessage: async (message: KafkaMessage, topic: string) => {
        const hostname = topic.replace(/-.+/i, '');
        const subtopic = topic.replace(/.+-/i, '');
        Logger.log(
          `Processing message from ${hostname} in topic ${subtopic} with the value of: ${message.value.toString()}`,
        );
        this.handleConsumerLogic(message, hostname, subtopic);
        //throw new Error('Test error!'); //TEST DEAD LETTER QUEUE
      },
    });
  }

  /**
   * Function that handles the logic of the consumer based on the subtopic
   * @param message - Kafka message
   * @param hostname - hostname of the device
   * @param subtopic - subtopic of the message
   */
  private async handleConsumerLogic(
    message: KafkaMessage,
    hostname: string,
    subtopic: string,
  ) {
    switch (subtopic) {
      case SUBTOPIC.IP:
        const ip = message.value.toString();
        this.databaseSerive
          .getDbHandle()
          .collection('devices')
          .updateOne(
            { hostname },
            { $set: { ip, status: true } },
            { upsert: true },
          );
        break;
      case SUBTOPIC.FREEMEMORY:
        const freeMemory = parseInt(message.value.toString());
        const minHeapSize = parseInt(this.configService.get('MIN_HEAP_SIZE'));
        this.databaseSerive
          .getDbHandle()
          .collection('devices')
          .updateOne({ hostname }, { $set: { freeMemory } }, { upsert: true });
        //if free memory DRAM heaps is less than MIN_HEAP_SIZE, create an alert
        if (freeMemory < minHeapSize) {
          this.databaseSerive
            .getDbHandle()
            .collection('alerts')
            .insertOne({
              hostname,
              type: ALERTTYPE.MEMORY,
              value: `The ${hostname} have less than ${minHeapSize} of free memory, please reboot the device`,
            });
        }
        break;
      case SUBTOPIC.WIFIRSSI:
        const rssi = parseInt(message.value.toString());
        const minRssi = parseInt(this.configService.get('MIN_RSSI'));
        this.databaseSerive
          .getDbHandle()
          .collection('devices')
          .updateOne({ hostname }, { $set: { rssi } }, { upsert: true });
        //if rssi is less than MIN_RSSI, create an alert
        if (rssi < minRssi) {
          this.databaseSerive
            .getDbHandle()
            .collection('alerts')
            .insertOne({
              hostname,
              type: ALERTTYPE.INTENSITY,
              value: `The ${hostname} have less than ${minRssi} of wifi intensity, please check the device connection`,
            });
        }
        break;
      case SUBTOPIC.JSON:
        const json = JSON.parse(message.value.toString());
        let value = json.value;
        //Handle cases where value is different from a Double or number format
        try {
          value = parseFloat(json.value);
        } catch (error) {
          Logger.error(`Value ${json.value} is not a number!`);
          return;
        }
        const maxConsumption = parseInt(
          this.configService.get('MAX_CONSUMPTION'),
        );
        //Just insert the measurment in the database if the previous value is not the same or is greater
        const lastValue = await this.databaseSerive
          .getDbHandle()
          .collection('measurements')
          .findOne(
            {
              hostname,
            },
            { sort: { createdAt: -1 } },
          );
        if (!lastValue || lastValue.value <= json.value) {
          this.databaseSerive
            .getDbHandle()
            .collection('measurements')
            .insertOne({
              hostname,
              value: json.value,
              createdAt: new Date(),
            });
        } else {
          Logger.log(
            `Value ${json.value} is less than the last value ${lastValue.value}`,
          );
        }
        //Get the first value registered on this day in the measurments colleciton base on the hostname and created at date
        const firstValueOfTheDay = await this.databaseSerive
          .getDbHandle()
          .collection('measurements')
          .findOne({
            hostname,
            createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
          });
        // Create an alert if the difference between the first value of the day and the last value is greater than MAX_CONSUMPTION
        const diff = json?.value - (firstValueOfTheDay?.value || json?.value);
        if (diff > maxConsumption) {
          this.databaseSerive
            .getDbHandle()
            .collection('alerts')
            .insertOne({
              hostname,
              type: ALERTTYPE.CONSUME,
              value: `The ${hostname} have exceeded the maximum consumption of ${maxConsumption} with a difference of ${diff}`,
            });
        }
        break;
      default:
        Logger.error(`Subtopic ${subtopic} not found!`);
    }
  }
}
