import React, { useState } from 'react';

import './RepoSearchPage.css';

import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import RepoTile from '@components/RepoTile/RepoTile';
import SearchIcon from '@components/SearchIcon';

import { ApiResponse } from '../../shared/store/ApiStore/types';
import GitHubStore from '../../store/GitHubStore';
import { RepoItem } from '../../store/GitHubStore/types';
import RepoBranchesDrawer from './components/RepoBranchesDrawer';

const gitHubStore = new GitHubStore();

const RepoSearchPage = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [reposList, setReposList] = useState<RepoItem[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value);
    };

    const searchRepo = () => {
        if (inputValue !== '') {
            setIsLoading(true);
            gitHubStore
                .getOrganizationReposList({
                    organizationName: inputValue
                })
                .then((result: ApiResponse<RepoItem[], any>) => {
                    setReposList(result.data);
                    setIsLoading(false);
                });
        }
    };

    const onClickRepo = (repo: RepoItem): void => {
        setSelectedRepo(repo);
    };

    const onClose = () => {
        setSelectedRepo(null);
    };

    const repoTiles = () => {
        if (isLoading) {
            return <div>Ищем репозитории</div>;
        } else if (reposList.length) {
            return reposList.map((repo: RepoItem): JSX.Element => {
                return (
                    <RepoTile
                        key={repo.id}
                        RepoItem={repo}
                        onClick={() => onClickRepo(repo)}
                    />
                );
            });
        }
        return null;
    };

    return (
        <div className={'repos-list'}>
            <div className={'repos-list__search'}>
                <Input
                    value={inputValue}
                    placeholder='Введите название организации'
                    onChange={searchOnChange}
                />
                <Button onClick={searchRepo}>
                    <SearchIcon />
                </Button>
            </div>
            <div className={'repos-list__repos'}>{repoTiles()}</div>
            <RepoBranchesDrawer selectedRepo={selectedRepo} onClose={onClose} />
        </div>
    );
};

export default React.memo(RepoSearchPage);
