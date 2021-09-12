import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { RepoItem } from '@store/GitHubStore/types';
import { dateFormat } from '@utils/utils';

import styles from './RepoTile.module.scss';

export type RepoTileProps = {
    repoItem: RepoItem;
    onClick: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({
    repoItem: {
        owner: { avatar_url, html_url, login },
        name,
        stargazers_count,
        updated_at
    },
    onClick
}): JSX.Element => {
    return (
        <div className={`${styles['repo-tile']}`} onClick={onClick}>
            <div className={`${styles['repo-tile__avatar']}`}>
                <Avatar src={avatar_url} letter={login.slice(1)} />
            </div>
            <div className={`${styles['repo-tile__content']}`}>
                <div className={`${styles['repo-tile__title']}`}>{name}</div>
                <a
                    className={`${styles['repo-tile__org-link']}`}
                    href={html_url}
                >
                    {login}
                </a>
                <div className={`${styles['repo-tile__additional-info']}`}>
                    <span className={`${styles['repo-tile__icon-raiting']}`}>
                        <StarIcon />
                    </span>
                    <span className={`${styles['repo-tile__raiting-info']}`}>
                        {stargazers_count}
                    </span>
                    <span className={`${styles['repo-tile__date-info']}`}>
                        {`Updated ${dateFormat(updated_at)}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RepoTile);
