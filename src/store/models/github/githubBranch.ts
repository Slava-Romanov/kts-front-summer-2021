export type GithubBranchItemApi = {
    name: string;
};

export type GithubBranchItemModel = {
    name: string;
};

export const normalizeGithubBranchItem = (
    from: GithubBranchItemApi
): GithubBranchItemModel => ({
    name: from.name
});
