/* eslint-disable no-magic-numbers */
import fs from 'fs';
import {resolve} from 'path';
import {Logger} from '@technote-space/github-action-log-helper';
import {createFile} from '../../src/utils/io';

jest.mock('fs');

describe('createFile', () => {
  it('should call writeFileSync', () => {
    const writeFileSyncFn = jest.fn();
    const mkdirSyncFn     = jest.fn();
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(mkdirSyncFn);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(writeFileSyncFn);

    createFile('workspace', 'filename', 'result', [], new Logger());

    expect(mkdirSyncFn).not.toBeCalled();
    expect(writeFileSyncFn).toBeCalledTimes(2);
    expect(writeFileSyncFn.mock.calls).toEqual([
      [resolve(__dirname, '../..', 'workspace/filename'), '[]'],
      [resolve(__dirname, '../..', 'workspace/result'), '[]'],
    ]);
  });

  it('should call mkdirSync if workspace is not exist', () => {
    const writeFileSyncFn = jest.fn();
    const mkdirSyncFn     = jest.fn();
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(mkdirSyncFn);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(writeFileSyncFn);

    createFile('workspace', '', '', [], new Logger());

    expect(mkdirSyncFn).toBeCalledTimes(1);
    expect(writeFileSyncFn).not.toBeCalled();
    expect(mkdirSyncFn).toBeCalledWith('workspace', {recursive: true});
  });
});
