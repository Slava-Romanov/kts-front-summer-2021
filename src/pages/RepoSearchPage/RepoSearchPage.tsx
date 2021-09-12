import React, { useState } from 'react';

import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import RepoTile from '@components/RepoTile/RepoTile';
import SearchIcon from '@components/SearchIcon';
import { ApiResponse } from '@shared/store/ApiStore/types';
import { RepoItem } from '@store/GitHubStore/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import { useStoreContext } from '../../App';
import styles from './RepoSearchPage.module.scss';

type ReposContextType = {
    reposList: RepoItem[];
    isLoading: boolean;
    setIsLoading: (e: boolean) => void;
};

const ReposContext = React.createContext<ReposContextType>({
    reposList: [] as RepoItem[],
    isLoading: false,
    setIsLoading: (e: boolean) => {}
} as ReposContextType);
const Provider = ReposContext.Provider;
export const useReposContext = () => React.useContext(ReposContext);

const RepoSearchPage: React.FC = () => {
    const storeContext = useStoreContext();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [reposList, setReposList] = useState<RepoItem[]>([]);

    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value);
    };

    const searchRepo = () => {
        if (inputValue !== '') {
            setIsLoading(true);
            loadRepos();
        }
    };

    const loadRepos = () => {
        storeContext?.store
            .getOrganizationReposList({
                organizationName: inputValue,
                page
            })
            .then((result: ApiResponse<RepoItem[], any>) => {
                setReposList(result.data);
                setIsLoading(false);
            });
    };

    const onClickRepo =
        (repo: RepoItem): (() => void) =>
        (): void => {
            history.push(`/repos/${repo.owner.login}/${repo.name}`);
        };

    const repoTiles = () => {
        if (isLoading) {
            return <div>Ищем репозитории</div>;
        } else if (reposList.length) {
            return reposList.map((repo: RepoItem): JSX.Element => {
                return (
                    <RepoTile
                        repoItem={repo}
                        key={repo.id}
                        onClick={onClickRepo(repo)}
                    />
                    // <Link
                    //     to={`/repos/${repo.owner.login}/${repo.name}`}
                    //     key={repo.id}
                    // >

                    // </Link>
                );
            });
        }
        return null;
    };

    const nextRepos = async () => {
        setPage(page + 1);
        await loadRepos();
    };

    return (
        <Provider value={{ reposList, isLoading, setIsLoading }}>
            <div className={`${styles['repos-list']}`}>
                <div className={`${styles['repos-list__search']}`}>
                    <Input
                        value={inputValue}
                        placeholder='Введите название организации'
                        onChange={searchOnChange}
                    />
                    <Button onClick={searchRepo}>
                        <SearchIcon />
                    </Button>
                </div>
                <div className={`${styles['repos-list__repos']}`}>
                    {reposList.length ? (
                        <InfiniteScroll
                            hasMore={true}
                            loader={<div>Загрузка</div>}
                            next={nextRepos}
                            dataLength={reposList.length}
                        >
                            {repoTiles()}
                        </InfiniteScroll>
                    ) : null}
                </div>
            </div>
        </Provider>
    );
};

export default React.memo(RepoSearchPage);
