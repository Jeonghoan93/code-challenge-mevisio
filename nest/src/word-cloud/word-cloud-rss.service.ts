import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { URL } from 'url';
import { DOMParser } from '@xmldom/xmldom';
import * as sw from 'stopword';

@Injectable()
export class WordCloudRssService {
  async fetchAndExtractTextFromFeed(
    url: URL,
  ): Promise<{ text: string; value: number }[]> {
    const response = await fetch(url);
    const xml = new DOMParser().parseFromString(
      await response.text(),
      response.headers.get('Content-Type') ?? undefined,
    );
    const descriptions = [];
    for (const descriptionElement of Array.prototype.slice.call(
      xml.getElementsByTagName('description'),
    )) {
      descriptions.push(
        descriptionElement.textContent.replace(/<.*?>/g, '').trim(),
      );
    }
    return processWords(descriptions);
  }
}

const processWords = (text: string[]): { text: string; value: number }[] => {
  const wordsArray = text.join(' ').split(/\s+/);
  const cleanWordsArray = sw.removeStopwords(wordsArray);

  const wordCountMap = new Map<string, number>();
  cleanWordsArray.forEach((word) => {
    const wordLowerCase = word.toLowerCase();
    wordCountMap.set(wordLowerCase, (wordCountMap.get(wordLowerCase) || 0) + 1);
  });

  return Array.from(wordCountMap.entries()).map(([text, value]) => ({
    text,
    value,
  }));
};
