import React, { useState } from 'react';

import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import RepoTile from '@components/RepoTile/RepoTile';
import SearchIcon from '@components/SearchIcon';
import { urls } from '@config/urls';
import useReposContext from '@shared/hooks/useReposContext';
import { RepoItem } from '@store/GitHubStore/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Route, Switch, useHistory } from 'react-router-dom';

import { StoreContext } from '../../App';
import RepoBranchesDrawer from './RepoBranchesDrawer';
import styles from './RepoSearchPage.module.scss';

const RepoSearchPage: React.FC = () => {
    const history = useHistory();
    const [inputValue, setInputValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const { isLoading, reposList, loadRepos } = useReposContext(StoreContext);

    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value);
    };

    const searchRepo = async () => {
        if (inputValue !== '') {
            setPage(1);
            await loadRepos(inputValue, 1);
        }
    };

    const onClickRepo =
        (repo: RepoItem): (() => void) =>
        (): void => {
            history.push(urls.router.openRepo(repo.owner.login, repo.name));
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
                );
            });
        }
        return null;
    };

    const nextRepos = async () => {
        setPage(page + 1);
        await loadRepos(inputValue, page + 1);
    };

    return (
        <>
            <div className={`${styles.reposList}`}>
                <div className={`${styles.reposList__search}`}>
                    <Input
                        value={inputValue}
                        placeholder='Введите название организации'
                        onChange={searchOnChange}
                    />
                    <Button onClick={searchRepo}>
                        <SearchIcon />
                    </Button>
                </div>
                <div className={`${styles.reposList__repos}`}>
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
            <Switch>
                <Route
                    exact
                    path='/repos/:owner/:repo'
                    component={RepoBranchesDrawer}
                />
            </Switch>
        </>
    );
};

export default React.memo(RepoSearchPage);
