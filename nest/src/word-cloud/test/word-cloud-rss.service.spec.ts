import { Test } from '@nestjs/testing';
import fetch from 'node-fetch';
import { URL } from 'url';
import { WordCloudRssService } from '../word-cloud-rss.service';

jest.mock('node-fetch');

describe('WordCloudRssService', () => {
  let service: WordCloudRssService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [WordCloudRssService],
    }).compile();

    service = moduleRef.get<WordCloudRssService>(WordCloudRssService);
  });

  it('should return word count from RSS feed', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    const rssXML = `
      <rss>
        <channel>
          <description>word1 word2 word1</description>
          <description>word3 word2 word2</description>
        </channel>
      </rss>
    `;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: () => Promise.resolve(rssXML),
      headers: { get: () => 'application/rss+xml' },
    } as any);

    const wordCount = await service.fetchAndExtractTextFromFeed(
      new URL('http://localhost/rss'),
    );
    expect(wordCount).toEqual([
      { text: 'word1', value: 2 },
      { text: 'word2', value: 3 },
      { text: 'word3', value: 1 },
    ]);
  });
});
