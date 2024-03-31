import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { DatabaseModule } from 'src/storage/storage.module';
import { Consumer } from './consumer';

@Module({
  imports: [DatabaseModule],
  providers: [ConsumerService, Consumer],
  exports: [ConsumerService, Consumer],
})
export class ConsumerModule {}
