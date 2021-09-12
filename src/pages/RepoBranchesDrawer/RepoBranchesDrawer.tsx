import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import { ApiResponse } from '@shared/store/ApiStore/types';
import { BranchItem } from '@store/GitHubStore/types';
import { Drawer } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { useStoreContext } from '../../App';
import styles from './RepoBranchesDrawer.module.scss';

const RepoBranchesDrawer: React.FC = () => {
    const storeContext = useStoreContext();
    const history = useHistory();
    const { owner, repo } = useParams<{ owner: string; repo: string }>();
    const [branchList, setBranchList] = useState<BranchItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        storeContext?.store
            .getReposBranchesList({
                ownerName: owner,
                repoName: repo
            })
            .then((result: ApiResponse<BranchItem[], any>) => {
                setBranchList(result.data);
                setIsLoading(false);
            });
    }, [owner, repo]);

    const onClose = () => {
        history.goBack();
    };

    return (
        <Drawer
            title='Ветки репозитория'
            placement='left'
            onClose={onClose}
            visible={true}
        >
            {isLoading ? (
                <div>Загружаем ветки</div>
            ) : (
                branchList?.map(
                    (branch: BranchItem): JSX.Element => (
                        <div
                            className={`${styles.repoBranchesDrawer__item}`}
                            key={branch.name}
                        >
                            {branch.name}
                        </div>
                    )
                )
            )}
        </Drawer>
    );
};

export default RepoBranchesDrawer;
