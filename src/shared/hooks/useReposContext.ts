import { Context, useContext, useState } from 'react';

import { ApiResponse } from '@shared/store/ApiStore/types';
import { RepoItem } from '@store/GitHubStore/types';

import { GithubContextType } from '../../App';

export type ReposContextType = {
    reposList: RepoItem[];
    isLoading: boolean;
    loadRepos: (value: string, page: number) => Promise<void>;
};

const useReposContext = (
    context: Context<GithubContextType | null>
): ReposContextType => {
    const storeContext = useContext(context);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reposList, setReposList] = useState<RepoItem[]>([]);

    const loadRepos = async (value: string, page: number) => {
        storeContext?.store
            .getOrganizationReposList({
                organizationName: value,
                page
            })
            .then((result: ApiResponse<RepoItem[], any>) => {
                if (page === 1) {
                    setReposList(result.data);
                } else {
                    setReposList(reposList.concat(result.data));
                }
                setIsLoading(false);
            });
    };

    return { reposList, isLoading, loadRepos };
};

export default useReposContext;
