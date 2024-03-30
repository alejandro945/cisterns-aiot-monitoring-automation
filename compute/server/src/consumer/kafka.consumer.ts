import { Logger } from '@nestjs/common';
import {
    Consumer,
    ConsumerConfig,
    ConsumerSubscribeTopics,
    Kafka,
    KafkaMessage,
} from 'kafkajs';
import * as retry from 'async-retry';
import { IConsumer } from './consumer.interface';
import { DatabaseService } from '@/storage/storage.service';
import { sleep } from '@/common/sleep';

export class KafkajsConsumer implements IConsumer {
    private readonly kafka: Kafka;
    private readonly consumer: Consumer;
    private readonly logger: Logger;

    constructor(
        private readonly topics: ConsumerSubscribeTopics,
        private readonly databaseService: DatabaseService,
        config: ConsumerConfig,
        broker: string,
    ) {
        this.kafka = new Kafka({ brokers: [broker] });
        this.consumer = this.kafka.consumer(config);
        this.logger = new Logger(`${config.groupId}`);
    }

    async consume(
        onMessage: (message: KafkaMessage, topic: string) => Promise<void>,
    ) {
        // Subcribe to all topics in this case hostname of each micro-controller
        await this.consumer.subscribe(this.topics);
        await this.consumer.run({
            eachMessage: async ({ message, partition, topic }) => {
                this.logger.debug(`Processing message partition: ${partition} in topic: ${topic}`);
                try {
                    await retry(async () => onMessage(message, topic), {
                        retries: 3,
                        onRetry: (error: any, attempt: number) =>
                            this.logger.error(
                                `Error consuming message, executing retry ${attempt}/3...`,
                                error,
                            ),
                    });
                } catch (err) {
                    this.logger.error(
                        'Error consuming message. Adding to dead letter queue...',
                        err,
                    );
                    await this.addMessageToDlq(message, topic);
                }
            },
        });
    }

    /**
     * Function to add a message to the dead letter queue
     * @param message - Kafka message
     * @param topic - Topic of the message
     */
    private async addMessageToDlq(message: KafkaMessage, topic: string) {
        await this.databaseService
            .getDbHandle()
            .collection('dlq')
            .insertOne({ value: message.value, topic: topic });
    }

    async connect() {
        try {
            await this.consumer.connect();
        } catch (err) {
            this.logger.error('Failed to connect to Kafka.', err);
            await sleep(5000);
            await this.connect();
        }
    }

    async disconnect() {
        await this.consumer.disconnect();
    }
}
