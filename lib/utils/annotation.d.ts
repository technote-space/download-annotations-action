import type { Annotations } from '../types';
import type { Context } from '@actions/github/lib/context';
import type { Octokit } from '@technote-space/github-action-helper';
export declare const getAnnotations: (octokit: Octokit, context: Context) => Promise<Annotations>;
