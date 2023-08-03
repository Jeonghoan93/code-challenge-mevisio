import { Controller, Get } from '@nestjs/common';
import { ChallengesService } from './challenge.service';

@Controller('api/challenge')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  getChallenge() {
    return this.challengesService.getChallenge();
  }
}
