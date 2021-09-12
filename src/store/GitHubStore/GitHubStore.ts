import ApiStore from '@shared/store/ApiStore';
import { ApiResponse, HTTPMethod } from '@shared/store/ApiStore/types';

import {
    GetOrganizationReposListParams,
    GetReposBranchesListParams,
    IGitHubStore,
    RepoItem
} from './types';

const BASE_URL = 'https://api.github.com';

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore(BASE_URL);

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
            endpoint: `/orgs/${params.organizationName}/repos`
        });
    }

    async getReposBranchesList(
        params: GetReposBranchesListParams
    ): Promise<ApiResponse<RepoItem[], any>> {
        return await this.apiStore.request({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `/repos/${params.ownerName}/${params.repoName}/branches`
        });
    }
}
