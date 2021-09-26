import { urls } from '@config/urls';
import ApiStore from '@shared/store/ApiStore';
import { ApiResponse, HTTPMethod } from '@shared/store/ApiStore/types';

import {
    GetOrganizationReposListParams,
    GetReposBranchesListParams,
    IGitHubStore,
    RepoItem
} from './types';

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore(urls.BASE_URL);

    async getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<ApiResponse<RepoItem[], any>> {
        return await this.apiStore.request({
            method: HTTPMethod.GET,
            data: {
                per_page: 7,
                page: params.page
            },
            headers: {},
            endpoint: urls.api.orgRepos(params.organizationName)
        });
    }

    async getReposBranchesList(
        params: GetReposBranchesListParams
    ): Promise<ApiResponse<RepoItem[], any>> {
        return await this.apiStore.request({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: urls.api.repoBranches(params.ownerName, params.repoName)
        });
    }
}
