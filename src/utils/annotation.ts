import {Context} from '@actions/github/lib/context';
import {Octokit} from '@technote-space/github-action-helper/dist/types';
import {PaginateInterface} from '@octokit/plugin-paginate-rest';
import {RestEndpointMethods} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';
import {Annotations} from '../types';

export const getAnnotations = async(octokit: Octokit, context: Context): Promise<Annotations> => {
  const workflowJobs = await (octokit.paginate as PaginateInterface)(
    (octokit as RestEndpointMethods).actions.listJobsForWorkflowRun, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      'run_id': Number(context.runId),
    },
  );

  const annotations = await Promise.all(workflowJobs.map(job => job.id).map(id => (octokit.paginate as PaginateInterface)(
    (octokit as RestEndpointMethods).checks.listAnnotations, {
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
