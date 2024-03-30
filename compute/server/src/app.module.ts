import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConsumerModule } from './consumer/consumer.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './storage/storage.module';
import { JobsModule } from './jobs/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    JobsModule,
    ConsumerModule,
    DatabaseModule,
  ],
})
export class AppModule {}
