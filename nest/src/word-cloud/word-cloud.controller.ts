import { Controller, Get, Query } from '@nestjs/common';
import { WordCloudRssService } from './word-cloud-rss.service';
import { URL } from 'url';

@Controller('api/word-cloud')
export class WordCloudController {
  constructor(private readonly wordCloudRssService: WordCloudRssService) {}

  @Get('rss')
  async getRssData(@Query('url') url: URL) {
    return this.wordCloudRssService.fetchAndExtractTextFromFeed(url);
  }
}
