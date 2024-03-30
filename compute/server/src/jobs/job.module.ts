import { Module } from '@nestjs/common';
import { JobsService } from './job.service';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '@/storage/storage.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 8000,
      maxRedirects: 5,
    }),
    DatabaseModule,
  ],
  providers: [JobsService],
})
export class JobsModule { }
