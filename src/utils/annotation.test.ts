/* eslint-disable no-magic-numbers */
import { resolve } from 'path';
import {
  testEnv,
  getOctokit,
  disableNetConnect,
  generateContext,
  getApiFixture,
} from '@technote-space/github-action-test-helper';
import nock from 'nock';
import { describe, expect, it } from 'vitest';
import { getAnnotations } from './annotation';

const rootDir     = resolve(__dirname, '../..');
const fixturesDir = resolve(__dirname, '..', 'fixtures');

describe('getAnnotations', () => {
  disableNetConnect(nock);
  testEnv(rootDir);

  it('should get annotations', async() => {
    nock('https://api.github.com')
      .persist()
      .get('/repos/hello/world/actions/runs/123/jobs')
      .reply(200, () => getApiFixture(fixturesDir, 'jobs'))
      .get(/repos\/hello\/world\/check-runs\/\d+\/annotations/)
      .reply(200, () => getApiFixture(fixturesDir, 'annotations'));

    const annotations = await getAnnotations(getOctokit(), generateContext({ owner: 'hello', repo: 'world' }, {
      runId: 123,
    }));

    expect(annotations).toHaveLength(10);
    expect(annotations[0]).toHaveProperty('job');
    expect(annotations[0]).toHaveProperty('annotations');
    expect(annotations[0].annotations).toHaveLength(5);
  });
});
