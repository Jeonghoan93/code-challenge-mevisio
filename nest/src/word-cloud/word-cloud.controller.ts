import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { WordCloudRssService } from './word-cloud-rss.service';
import { URL } from 'url';

@Controller('api/word-cloud')
export class WordCloudController {
  constructor(private readonly wordCloudRssService: WordCloudRssService) {}

  @Get('rss')
  async getRssData(@Query('url') url: URL) {
    try {
      return this.wordCloudRssService.fetchAndExtractTextFromFeed(url);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
