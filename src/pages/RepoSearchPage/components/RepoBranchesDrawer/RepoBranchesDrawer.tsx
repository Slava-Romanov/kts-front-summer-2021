import React, { useEffect, useState } from 'react';

import './RepoBranchesDrawer.css';
import 'antd/dist/antd.css';
import { Drawer } from 'antd';

import { ApiResponse } from '../../../../shared/store/ApiStore/types';
import GitHubStore from '../../../../store/GitHubStore';
import { BranchItem, RepoItem } from '../../../../store/GitHubStore/types';

const gitHubStore = new GitHubStore();

export type RepoBranchesDrawerProps = {
    selectedRepo: RepoItem | null;
    onClose: () => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
    selectedRepo,
    onClose
}): JSX.Element => {
    const [branchList, setBranchList] = useState<BranchItem[]>([]);

    useEffect(() => {
        if (selectedRepo) {
            gitHubStore
                .getReposBranchesList({
                    ownerName: selectedRepo.owner.login,
                    repoName: selectedRepo.name
                })
                .then((result: ApiResponse<BranchItem[], any>) => {
                    setBranchList(result.data);
                });
        }
    }, [selectedRepo]);

    const branches = () => {
        return branchList?.map((branch: BranchItem): JSX.Element => {
            return (
                <div className='repo-branches-drawer__item' key={branch.name}>
                    {branch.name}
                </div>
            );
        });
    };

    return (
        <Drawer
            title='Ветки репозитория'
            placement='left'
            onClose={onClose}
            visible={selectedRepo !== null}
        >
            {branches()}
        </Drawer>
    );
};

export default RepoBranchesDrawer;
