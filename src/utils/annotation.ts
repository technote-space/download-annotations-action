import { Context } from '@actions/github/lib/context';
import { Octokit } from '@technote-space/github-action-helper/dist/types';
import { Annotations } from '../types';
import { getTargetRunId } from './params';

export const getAnnotations = async(octokit: Octokit, context: Context): Promise<Annotations> => {
  const workflowJobs = await octokit.paginate(
    octokit.rest.actions.listJobsForWorkflowRun, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      'run_id': getTargetRunId(context),
    },
  );

  const annotations = await Promise.all(workflowJobs.map(job => job.id).map(id => octokit.paginate(
    octokit.rest.checks.listAnnotations, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      'check_run_id': id,
    }),
  ));

  return workflowJobs.map(job => job.id).map((id, index) => ({
    job: workflowJobs[index],
    annotations: annotations[index],
  }));
};
