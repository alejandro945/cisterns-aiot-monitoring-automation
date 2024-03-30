import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerConfig, ConsumerSubscribeTopics, KafkaMessage } from 'kafkajs';
import { IConsumer } from './consumer.interface';
import { KafkajsConsumer } from './kafka.consumer';
import { DatabaseService } from '@/storage/storage.service';

interface KafkajsConsumerOptions {
  topic: ConsumerSubscribeTopics;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage, topic: string) => Promise<void>;
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly databaserService: DatabaseService,
  ) { }

  async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
    const consumer = new KafkajsConsumer(
      topic,
      this.databaserService,
      config,
      this.configService.get('KAFKA_BROKER'),
    );
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
