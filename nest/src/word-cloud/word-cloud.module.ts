import { Module } from '@nestjs/common';
import { WordCloudController } from './word-cloud.controller';
import { WordCloudRssService } from './word-cloud-rss.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WordCloudController],
  providers: [WordCloudRssService],
})
export class WordCloudModule {}
