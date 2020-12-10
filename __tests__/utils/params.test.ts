/* eslint-disable no-magic-numbers */
import {testEnv} from '@technote-space/github-action-test-helper';
import {
  getMatchOptions,
  getWorkspace,
  getFilename,
  getResultFilename,
  getIncludeJobNamePatterns,
  getExcludeJobNamePatterns,
  getIncludeLevels,
  getExcludeLevels,
  getIncludeMessagePatterns,
  getExcludeMessagePatterns,
} from '../../src/utils/params';

describe('getMatchOptions', () => {
  testEnv();

  it('should return default match options', () => {
    expect(getMatchOptions()).toEqual({
      nobrace: false,
      noglobstar: false,
      dot: false,
      noext: false,
      nocase: false,
      matchBase: false,
      nonegate: false,
    });
  });

  it('should return match options', () => {
    process.env.INPUT_MINIMATCH_OPTION_NOBRACE    = '1';
    process.env.INPUT_MINIMATCH_OPTION_NOGLOBSTAR = 'true';
    process.env.INPUT_MINIMATCH_OPTION_DOT        = 'a';
    process.env.INPUT_MINIMATCH_OPTION_NOEXT      = '1';
    process.env.INPUT_MINIMATCH_OPTION_NOCASE     = '1';
    process.env.INPUT_MINIMATCH_OPTION_MATCH_BASE = '1';
    process.env.INPUT_MINIMATCH_OPTION_NONEGATE   = '1';
    expect(getMatchOptions()).toEqual({
      nobrace: true,
      noglobstar: true,
      dot: true,
      noext: true,
      nocase: true,
      matchBase: true,
      nonegate: true,
    });
  });
});

describe('getWorkspace', () => {
  testEnv();

  it('should get default workspace', () => {
    expect(getWorkspace()).toBe('');
  });

  it('should get workspace', () => {
    process.env.INPUT_WORKSPACE = 'abc';
    expect(getWorkspace()).toBe('abc');
  });
});

describe('getFilename', () => {
  testEnv();

  it('should get default filename', () => {
    expect(getFilename()).toBe('');
  });

  it('should get filename', () => {
    process.env.INPUT_FILENAME = 'abc';
    expect(getFilename()).toBe('abc');
  });
});

describe('getResultFilename', () => {
  testEnv();

  it('should get default result filename', () => {
    expect(getResultFilename()).toBe('');
  });

  it('should get result filename', () => {
    process.env.INPUT_RESULT_FILENAME = 'abc';
    expect(getResultFilename()).toBe('abc');
  });
});

describe('getIncludeJobNamePatterns', () => {
  testEnv();

  it('should get default include job name patterns', () => {
    expect(getIncludeJobNamePatterns()).toEqual([]);
  });

  it('should get include job name patterns', () => {
    process.env.INPUT_INCLUDE_JOB_NAME_PATTERNS = 'test1, test2\ntest3';
    expect(getIncludeJobNamePatterns()).toEqual(['test1', 'test2', 'test3']);
  });
});

describe('getExcludeJobNamePatterns', () => {
  testEnv();

  it('should get default exclude job name patterns', () => {
    expect(getExcludeJobNamePatterns()).toEqual([]);
  });

  it('should get exclude job name patterns', () => {
    process.env.INPUT_EXCLUDE_JOB_NAME_PATTERNS = 'test1, test2\ntest3';
    expect(getExcludeJobNamePatterns()).toEqual(['test1', 'test2', 'test3']);
  });
});

describe('getIncludeLevels', () => {
  testEnv();

  it('should get default include levels', () => {
    expect(getIncludeLevels()).toEqual([]);
  });

  it('should get include levels', () => {
    process.env.INPUT_INCLUDE_LEVELS = 'notice, warning\nfailure';
    expect(getIncludeLevels()).toEqual(['notice', 'warning', 'failure']);
  });
});

describe('getExcludeLevels', () => {
  testEnv();

  it('should get default exclude levels', () => {
    expect(getExcludeLevels()).toEqual([]);
  });

  it('should get exclude levels', () => {
    process.env.INPUT_EXCLUDE_LEVELS = 'notice, warning\nfailure';
    expect(getExcludeLevels()).toEqual(['notice', 'warning', 'failure']);
  });
});

describe('getIncludeMessagePatterns', () => {
  testEnv();

  it('should get default include message patterns', () => {
    expect(getIncludeMessagePatterns()).toEqual([]);
  });

  it('should get include message patterns', () => {
    process.env.INPUT_INCLUDE_MESSAGE_PATTERNS = 'test1, test2\ntest3';
    expect(getIncludeMessagePatterns()).toEqual(['test1', 'test2', 'test3']);
  });
});

describe('getExcludeMessagePatterns', () => {
  testEnv();

  it('should get default exclude message patterns', () => {
    expect(getExcludeMessagePatterns()).toEqual([]);
  });

  it('should get exclude message patterns', () => {
    process.env.INPUT_EXCLUDE_MESSAGE_PATTERNS = 'test1, test2\ntest3';
    expect(getExcludeMessagePatterns()).toEqual(['test1', 'test2', 'test3']);
  });
});
