/* eslint-disable no-magic-numbers */
import {filterByJobName, filterByLevel, filterByMessage} from '../../src/utils/filter';
import {AnnotationData, JobData} from '../../src/types';

const createJob        = (name: string): JobData => ({
  'id': 123,
  'run_id': 456,
  'run_url': '',
  'node_id': '',
  'head_sha': '',
  'url': '',
  'html_url': '',
  'status': 'completed',
  'conclusion': null,
  'started_at': '',
  'completed_at': '',
  name,
  'check_run_url': '',
});
const createAnnotation = (message: string, level: 'warning' | 'notice' | 'failure' = 'warning'): AnnotationData => ({
  'path': 'README.md',
  'start_line': 2,
  'end_line': 2,
  'start_column': 5,
  'end_column': 10,
  'annotation_level': level,
  'title': 'test',
  'message': message,
  'raw_details': 'test details',
  'blob_href': 'https://api.github.com/repos/github/rest-api-description/git/blobs/abc',
});

describe('filterByJobName', () => {
  it('should filter by job id', () => {
    expect(filterByJobName([], [], [])).toEqual([]);
    expect(filterByJobName([
      {job: createJob('123'), annotations: []},
    ], [], [])).toEqual([
      {job: createJob('123'), annotations: []},
    ]);
    expect(filterByJobName([
      {job: createJob('123'), annotations: []},
      {job: createJob('456'), annotations: []},
    ], ['123', '456'], [])).toEqual([
      {job: createJob('123'), annotations: []},
      {job: createJob('456'), annotations: []},
    ]);
    expect(filterByJobName([
      {job: createJob('123'), annotations: []},
      {job: createJob('456'), annotations: []},
    ], ['123'], [])).toEqual([
      {job: createJob('123'), annotations: []},
    ]);
    expect(filterByJobName([
      {job: createJob('123'), annotations: []},
      {job: createJob('456'), annotations: []},
    ], ['123'], ['123'])).toEqual([]);
    expect(filterByJobName([
      {job: createJob('123'), annotations: []},
      {job: createJob('456'), annotations: []},
    ], [], ['123'])).toEqual([
      {job: createJob('456'), annotations: []},
    ]);
    expect(filterByJobName([
      {job: createJob('123'), annotations: []},
      {job: createJob('456'), annotations: []},
    ], [], ['123', '456'])).toEqual([]);
  });
});

describe('filterByLevel', () => {
  it('should filter by level', () => {
    expect(filterByLevel([], [], [])).toEqual([]);
    expect(filterByLevel([
      {job: createJob('123'), annotations: []},
    ], [], [])).toEqual([
      {job: createJob('123'), annotations: []},
    ]);
    expect(filterByLevel([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('warning', 'warning'),
          createAnnotation('notice', 'notice'),
          createAnnotation('failure', 'failure'),
        ],
      },
    ], ['warning', 'notice'], [])).toEqual([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('warning', 'warning'),
          createAnnotation('notice', 'notice'),
        ],
      },
    ]);
    expect(filterByLevel([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('warning', 'warning'),
          createAnnotation('notice', 'notice'),
          createAnnotation('failure', 'failure'),
        ],
      },
    ], ['warning'], [])).toEqual([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('warning', 'warning'),
        ],
      },
    ]);
    expect(filterByLevel([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('warning', 'warning'),
          createAnnotation('notice', 'notice'),
          createAnnotation('failure', 'failure'),
        ],
      },
    ], ['warning'], ['warning'])).toEqual([
      {
        job: createJob('123'),
        annotations: [],
      },
    ]);
    expect(filterByLevel([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('warning', 'warning'),
          createAnnotation('notice', 'notice'),
          createAnnotation('failure', 'failure'),
        ],
      },
    ], [], ['warning'])).toEqual([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('notice', 'notice'),
          createAnnotation('failure', 'failure'),
        ],
      },
    ]);
    expect(filterByLevel([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('warning', 'warning'),
          createAnnotation('notice', 'notice'),
          createAnnotation('failure', 'failure'),
        ],
      },
    ], [], ['warning', 'notice'])).toEqual([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('failure', 'failure'),
        ],
      },
    ]);
  });
});

describe('filterByMessage', () => {
  it('should filter by message', () => {
    expect(filterByMessage([], [], [])).toEqual([]);
    expect(filterByMessage([
      {job: createJob('123'), annotations: []},
    ], [], [])).toEqual([
      {job: createJob('123'), annotations: []},
    ]);
    expect(filterByMessage([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('test1'),
          createAnnotation('test2'),
          createAnnotation('abc'),
          createAnnotation(''),
        ],
      },
    ], ['TEST'], [])).toEqual([
      {
        job: createJob('123'),
        annotations: [],
      },
    ]);
    expect(filterByMessage([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('test1'),
          createAnnotation('test2'),
          createAnnotation('abc'),
        ],
      },
    ], ['TEST\\d+'], [], 'i')).toEqual([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('test1'),
          createAnnotation('test2'),
        ],
      },
    ]);
    expect(filterByMessage([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('test1'),
          createAnnotation('test2'),
          createAnnotation('abc'),
        ],
      },
    ], ['test'], ['test1'])).toEqual([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('test2'),
        ],
      },
    ]);
    expect(filterByMessage([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('test1'),
          createAnnotation('test2'),
          createAnnotation('abc'),
          createAnnotation(' !"#$%&\'()=~|-^¥`{*}+<>?@[;:],./_ test/slash '),
        ],
      },
    ], [], ['test.+'])).toEqual([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('abc'),
        ],
      },
    ]);
    expect(filterByMessage([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('test1'),
          createAnnotation('test2'),
          createAnnotation('ABC'),
          createAnnotation(' !"#$%&\'()=~|-^¥`{*}+<>?@[;:],./_ test/slash '),
        ],
      },
    ], [], ['test\\d+', 'test/slash', 'abc'])).toEqual([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('ABC'),
        ],
      },
    ]);
    expect(filterByMessage([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('test1'),
          createAnnotation('test2'),
          createAnnotation('ABC'),
        ],
      },
    ], [], ['test', 'abc'], undefined, 'i')).toEqual([
      {
        job: createJob('123'),
        annotations: [],
      },
    ]);
    expect(filterByMessage([
      {
        job: createJob('123'),
        annotations: [
          createAnnotation('>> warning " > @octokit/plugin-paginate-rest@2.6.2" has unmet peer dependency "@octokit/core@>=2".'),
          createAnnotation('>> warning " > react-autosize-textarea@7.1.0" has incorrect peer dependency "react@^0.14.0 || ^15.0.0 || ^16.0.0".'),
          createAnnotation('>> warning jest > jest-cli > jest-config > jest-environment-jsdom > jsdom > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142'),
          createAnnotation('>> Cloning into .github/workflows/.tmp/workflows...'),
        ],
      },
    ], [], ['warning', 'Cloning into'], undefined)).toEqual([
      {
        job: createJob('123'),
        annotations: [],
      },
    ]);
  });
});
