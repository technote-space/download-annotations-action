/* eslint-disable no-magic-numbers */
import fs from 'fs';
import {resolve} from 'path';
import nock from 'nock';
import {
  testEnv,
  spyOnStdout,
  getOctokit,
  generateContext,
  stdoutCalledWith,
  getLogStdout,
  disableNetConnect,
  getApiFixture,
} from '@technote-space/github-action-test-helper';
import {Logger} from '@technote-space/github-action-log-helper';
import {execute} from '../src/process';

jest.mock('fs');

const rootDir     = resolve(__dirname, '..');
const fixturesDir = resolve(__dirname, 'fixtures');

describe('execute', () => {
  disableNetConnect(nock);
  testEnv(rootDir);

  it('should execute', async() => {
    process.env.INPUT_INCLUDE_JOB_NAME_PATTERNS = 'Publish*';
    process.env.INPUT_INCLUDE_LEVELS            = 'warning';
    process.env.INPUT_EXCLUDE_MESSAGE_PATTERNS  = 'warning\nCloning into';

    const writeFileSyncFn = jest.fn();
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(writeFileSyncFn);

    const mockStdout = spyOnStdout();
    nock('https://api.github.com')
      .persist()
      .get('/repos/hello/world/actions/runs/123/jobs')
      .reply(200, () => getApiFixture(fixturesDir, 'jobs'))
      .get(/repos\/hello\/world\/check-runs\/\d+\/annotations/)
      .reply(200, () => getApiFixture(fixturesDir, 'annotations'));

    await execute(new Logger(), getOctokit(), generateContext({owner: 'hello', repo: 'world'}, {
      runId: 123,
    }));

    const annotations1 = [
      {
        'path': 'README.md',
        'start_line': 2,
        'end_line': 2,
        'start_column': 5,
        'end_column': 10,
        'annotation_level': 'warning',
        'title': 'Warning test1',
        'message': 'Warning test1 message',
        'raw_details': 'Warning test1 details',
        'blob_href': 'https://api.github.com/repos/github/rest-api-description/git/blobs/abc',
      },
      {
        'path': 'README.md',
        'start_line': 2,
        'end_line': 2,
        'start_column': 5,
        'end_column': 10,
        'annotation_level': 'warning',
        'title': 'Warning test2',
        'message': '  >> Cloning into \'.github/workflows/.tmp/workflows\'...',
        'raw_details': 'Warning test2 details',
        'blob_href': 'https://api.github.com/repos/github/rest-api-description/git/blobs/abc',
      },
      {
        'path': 'README.md',
        'start_line': 2,
        'end_line': 2,
        'start_column': 5,
        'end_column': 10,
        'annotation_level': 'warning',
        'title': 'Warning test3',
        'message': '  >> warning " > @octokit/plugin-paginate-rest@2.6.2" has unmet peer dependency "@octokit/core@>=2".',
        'raw_details': 'Warning test3 details',
        'blob_href': 'https://api.github.com/repos/github/rest-api-description/git/blobs/abc',
      },
      {
        'path': 'README.md',
        'start_line': 2,
        'end_line': 2,
        'start_column': 5,
        'end_column': 10,
        'annotation_level': 'failure',
        'title': 'Failure test',
        'message': 'Failure test message',
        'raw_details': 'Failure test details',
        'blob_href': 'https://api.github.com/repos/github/rest-api-description/git/blobs/abc',
      },
      {
        'path': 'README.md',
        'start_line': 2,
        'end_line': 2,
        'start_column': 5,
        'end_column': 10,
        'annotation_level': 'notice',
        'title': 'Notice test',
        'message': 'Notice test message',
        'raw_details': 'Notice test details',
        'blob_href': 'https://api.github.com/repos/github/rest-api-description/git/blobs/abc',
      },
    ];
    const annotations2 = [
      {
        'path': 'README.md',
        'start_line': 2,
        'end_line': 2,
        'start_column': 5,
        'end_column': 10,
        'annotation_level': 'warning',
        'title': 'Warning test1',
        'message': 'Warning test1 message',
        'raw_details': 'Warning test1 details',
        'blob_href': 'https://api.github.com/repos/github/rest-api-description/git/blobs/abc',
      },
    ];
    stdoutCalledWith(mockStdout, [
      '::group::Settings:',
      getLogStdout({
        includeJobNamePatterns: ['Publish*'],
        excludeJobNamePatterns: [],
        includeJobNamePatternFlags: '',
        excludeJobNamePatternFlags: '',
        includeLevels: ['warning'],
        excludeLevels: [],
        includeMessagePatterns: [],
        excludeMessagePatterns: ['warning', 'Cloning into'],
        includeMessagePatternFlags: '',
        excludeMessagePatternFlags: '',
      }),
      '::endgroup::',
      '::group::Annotations:',
      getLogStdout({
        job: {
          'id': 1511906976,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'ESLint',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511909554,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Coverage (ubuntu-16.04)',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511909597,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Coverage (ubuntu-latest)',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511909628,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Coverage (ubuntu-20.04)',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511909659,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Coverage (macos-latest)',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511919468,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Publish Package (npm)',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511919497,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Publish Package (gpr)',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511919569,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Release GitHub Actions',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511925593,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Create Release',
        },
        annotations: annotations1,
      }),
      getLogStdout({
        'job': {
          'id': 1511927174,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Slack',
        },
        annotations: annotations1,
      }),
      '::endgroup::',
      '::group::Filtered Annotations:',
      getLogStdout({
        'job': {
          'id': 1511919468,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Publish Package (npm)',
        },
        annotations: annotations2,
      }),
      getLogStdout({
        'job': {
          'id': 1511919497,
          'run_id': 406257557,
          'status': 'completed',
          'conclusion': 'success',
          'name': 'Publish Package (gpr)',
        },
        annotations: annotations2,
      }),
      '::endgroup::',
      '::group::path:',
      `"${rootDir}/\${{ github.workspace }}/annotations.json"`,
      `::set-output name=path::${rootDir}/\${{ github.workspace }}/annotations.json`,
      '::endgroup::',
      '::group::result_path:',
      `"${rootDir}/\${{ github.workspace }}/result.json"`,
      `::set-output name=result_path::${rootDir}/\${{ github.workspace }}/result.json`,
      '::endgroup::',
      '::group::number:',
      '2',
      '::set-output name=number::2',
      '::endgroup::',
      '::group::messages:',
      '"[\\"Warning test1 message\\",\\"Warning test1 message\\"]"',
      '::set-output name=messages::["Warning test1 message","Warning test1 message"]',
    ]);

    expect(writeFileSyncFn).toBeCalledTimes(2);
    expect(writeFileSyncFn.mock.calls).toEqual([
      [
        resolve(rootDir, '${{ github.workspace }}/annotations.json'),
        JSON.stringify([
          ...annotations2,
          ...annotations2,
        ]),
      ],
      [
        resolve(rootDir, '${{ github.workspace }}/result.json'),
        JSON.stringify([
          {
            'job': {
              'id': 1511919468,
              'run_id': 406257557,
              'status': 'completed',
              'conclusion': 'success',
              'name': 'Publish Package (npm)',
            },
            annotations: annotations2,
          },
          {
            'job': {
              'id': 1511919497,
              'run_id': 406257557,
              'status': 'completed',
              'conclusion': 'success',
              'name': 'Publish Package (gpr)',
            },
            annotations: annotations2,
          },
        ]),
      ],
    ]);
  });
});
