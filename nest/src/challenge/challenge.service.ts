import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { marked } from 'marked';

@Injectable()
export class ChallengesService {
  async getChallenge(): Promise<string> {
    const filePath = join(__dirname, '..', '..', '..', 'CHALLENGE.md');
    const fileContent = await readFile(filePath, 'utf8');
    return marked(fileContent);
  }
}
