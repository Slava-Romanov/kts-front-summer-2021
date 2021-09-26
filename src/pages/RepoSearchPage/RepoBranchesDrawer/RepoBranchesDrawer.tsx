import React, { useContext, useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import useBranchesContext from '@shared/hooks/useBranchesContext';
import { BranchItem } from '@store/models/types';
import { Meta } from '@utils/meta';
import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from 'react-router-dom';

import { StoreContext } from '../../../App';
import styles from './RepoBranchesDrawer.module.scss';

const RepoBranchesDrawer: React.FC = () => {
    const history = useHistory();
    const store = useBranchesContext(StoreContext);
    const { owner, repo } = useParams<{ owner: string; repo: string }>();

    useEffect(() => {
        store?.getReposBranchesList({
            ownerName: owner,
            repoName: repo
        });
    });

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
            {store?.meta === Meta.loading ? (
                <div>Загружаем ветки</div>
            ) : store?.meta === Meta.error ? (
                <div>
                    Что-то пошло не так. Пожалуйста, перезагрузите страницу
                </div>
            ) : (
                store?.branches?.map(
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

export default observer(RepoBranchesDrawer);
