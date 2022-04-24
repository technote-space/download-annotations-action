/* eslint-disable no-magic-numbers */
import { testEnv, generateContext } from '@technote-space/github-action-test-helper';
import { describe, expect, it } from 'vitest';
import {
  getTargetRunId,
  getWorkspace,
  getFilename,
  getResultFilename,
  getIncludeJobNamePatterns,
  getExcludeJobNamePatterns,
  getIncludeJobNamePatternFlags,
  getExcludeJobNamePatternFlags,
  getIncludeLevels,
  getExcludeLevels,
  getIncludeMessagePatterns,
  getExcludeMessagePatterns,
  getIncludeMessagePatternFlags,
  getExcludeMessagePatternFlags,
} from './params';

describe('getTargetRunId', () => {
  testEnv();

  it('should get default target run id', () => {
    expect(getTargetRunId(generateContext({ owner: 'hello', repo: 'world' }, {
      runId: 123,
    }))).toBe(123);
  });

  it('should get target run id', () => {
    process.env.INPUT_TARGET_RUN_ID = '456';
    expect(getTargetRunId(generateContext({ owner: 'hello', repo: 'world' }, {
      runId: 123,
    }))).toBe(456);
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

describe('getIncludeJobNamePatternFlags', () => {
  testEnv();

  it('should get default include job name pattern flags', () => {
    expect(getIncludeJobNamePatternFlags()).toBe('');
  });

  it('should get include job name pattern flags', () => {
    process.env.INPUT_INCLUDE_JOB_NAME_PATTERN_FLAGS = 'i';
    expect(getIncludeJobNamePatternFlags()).toBe('i');
  });
});

describe('getExcludeJobNamePatternFlags', () => {
  testEnv();

  it('should get default exclude job name pattern flags', () => {
    expect(getExcludeJobNamePatternFlags()).toBe('');
  });

  it('should get exclude job name pattern flags', () => {
    process.env.INPUT_EXCLUDE_JOB_NAME_PATTERN_FLAGS = 'i';
    expect(getExcludeJobNamePatternFlags()).toBe('i');
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

describe('getIncludeMessagePatternFlags', () => {
  testEnv();

  it('should get default include message pattern flags', () => {
    expect(getIncludeMessagePatternFlags()).toBe('');
  });

  it('should get include message pattern flags', () => {
    process.env.INPUT_INCLUDE_MESSAGE_PATTERN_FLAGS = 'i';
    expect(getIncludeMessagePatternFlags()).toBe('i');
  });
});

describe('getExcludeMessagePatternFlags', () => {
  testEnv();

  it('should get default exclude message pattern flags', () => {
    expect(getExcludeMessagePatternFlags()).toBe('');
  });

  it('should get exclude message pattern flags', () => {
    process.env.INPUT_EXCLUDE_MESSAGE_PATTERN_FLAGS = 'i';
    expect(getExcludeMessagePatternFlags()).toBe('i');
  });
});
