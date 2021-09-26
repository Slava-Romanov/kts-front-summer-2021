// /repos/${repo.owner.login}/${repo.name}

export const urls = {
    BASE_URL: 'https://api.github.com',
    api: {
        orgRepos: (organizationName: string): string =>
            `/orgs/${organizationName}/repos`,
        repoBranches: (ownerName: string, repoName: string): string =>
            `/repos/${ownerName}/${repoName}/branches`
    },
    router: {
        openRepo: (loginOwner: string, nameRepo: string): string =>
            `/repos/${loginOwner}/${nameRepo}`
    }
};
