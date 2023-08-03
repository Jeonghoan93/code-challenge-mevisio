import { Module } from '@nestjs/common';
import { ChallengeModule } from './challenge/challenge.module';
import { WordCloudModule } from './word-cloud/word-cloud.module';

@Module({
  imports: [ChallengeModule, WordCloudModule],
})
export class AppModule {}
