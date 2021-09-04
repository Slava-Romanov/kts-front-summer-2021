import { ApiResponse } from '../../shared/store/ApiStore/types';

export type GetOrganizationReposListParams = {
    organizationName: string;
};

export type GetReposBranchesListParams = {
    ownerName: string;
    repoName: string;
};

export type GithubRepoOwner = {
    id: number;
    html_url: string;
    avatar_url: string;
    login: string;
};

export type RepoItem = {
    id: number;
    url: string;
    name: string;
    stargazers_count: number;
    updated_at: string;
    owner: GithubRepoOwner;
};

export type BranchItem = {
    name: string;
};

/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
export interface IGitHubStore {
    getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<ApiResponse<RepoItem[], any>>;

    getReposBranchesList(
        params: GetReposBranchesListParams
    ): Promise<ApiResponse<RepoItem[], any>>;
}
