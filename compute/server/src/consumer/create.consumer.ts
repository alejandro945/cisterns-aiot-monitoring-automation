import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Consumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService, private readonly configService: ConfigService,
    ) { }

    async onModuleInit() {
        await this.consumerService.consume({
            topic: { topics: this.configService.get('TOPICS') },
            config: { groupId: 'server-consumer' },
            onMessage: async (message) => {
                console.log({
                    value: message.value.toString(),
                });
                //throw new Error('Test error!');
            },
        });
    }
}