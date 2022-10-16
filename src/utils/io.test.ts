/* eslint-disable no-magic-numbers */
import fs from 'fs';
import { resolve } from 'path';
import { Logger } from '@technote-space/github-action-log-helper';
import { spyOnSetOutput, setOutputCalledWith } from '@technote-space/github-action-test-helper';
import { describe, expect, it, vi } from 'vitest';
import { createFile } from './io';

vi.mock('fs');

const rootDir = resolve(__dirname, '..', '..');

describe('createFile', () => {
  it('should call writeFileSync', () => {
    const writeFileSyncFn = vi.fn();
    const mkdirSyncFn     = vi.fn();
    vi.spyOn(fs, 'existsSync').mockImplementation(() => true);
    vi.spyOn(fs, 'mkdirSync').mockImplementation(mkdirSyncFn);
    vi.spyOn(fs, 'writeFileSync').mockImplementation(writeFileSyncFn);
    const mockOutput = spyOnSetOutput();

    createFile('workspace', 'filename', 'result', [], new Logger());

    expect(mkdirSyncFn).not.toBeCalled();
    expect(writeFileSyncFn).toBeCalledTimes(2);
    expect(writeFileSyncFn.mock.calls).toEqual([
      [resolve(__dirname, '../..', 'workspace/filename'), '[]'],
      [resolve(__dirname, '../..', 'workspace/result'), '[]'],
    ]);
    setOutputCalledWith(mockOutput, [
      { name: 'path', value: `${rootDir}/workspace/filename` },
      { name: 'result_path', value: `${rootDir}/workspace/result` },
      { name: 'number', value: 0 },
      { name: 'messages', value: '[]' },
    ]);
  });

  it('should call mkdirSync if workspace is not exist', () => {
    const writeFileSyncFn = vi.fn();
    const mkdirSyncFn     = vi.fn();
    vi.spyOn(fs, 'existsSync').mockImplementation(() => false);
    vi.spyOn(fs, 'mkdirSync').mockImplementation(mkdirSyncFn);
    vi.spyOn(fs, 'writeFileSync').mockImplementation(writeFileSyncFn);
    const mockOutput = spyOnSetOutput();

    createFile('workspace', '', '', [], new Logger());

    expect(mkdirSyncFn).toBeCalledTimes(1);
    expect(writeFileSyncFn).not.toBeCalled();
    expect(mkdirSyncFn).toBeCalledWith('workspace', { recursive: true });
    setOutputCalledWith(mockOutput, [
      { name: 'number', value: 0 },
      { name: 'messages', value: '[]' },
    ]);
  });
});
