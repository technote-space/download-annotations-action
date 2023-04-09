import type { Annotations } from '../types';
export declare const filterByJobName: (annotations: Annotations, includePatterns: Array<string>, excludePatterns: Array<string>, includePatternFlags?: string, excludePatternFlags?: string) => Annotations;
export declare const filterByLevel: (annotations: Annotations, includeLevels: Array<string>, excludeLevels: Array<string>) => Annotations;
export declare const filterByMessage: (annotations: Annotations, includePatterns: Array<string>, excludePatterns: Array<string>, includePatternFlags?: string, excludePatternFlags?: string) => Annotations;
