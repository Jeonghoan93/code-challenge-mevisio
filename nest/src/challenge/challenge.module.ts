import { Module } from '@nestjs/common';
import { ChallengesController } from './challenge.controller';
import { ChallengesService } from './challenge.service';

@Module({
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengeModule {}
