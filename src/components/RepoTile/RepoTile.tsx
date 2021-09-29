import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { GithubRepoItemModel } from '@store/models/github/githubRepoItem';
import { dateFormat } from '@utils/utils';

import styles from './RepoTile.module.scss';

export type RepoTileProps = {
    repoItem: GithubRepoItemModel;
    onClick: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({
    repoItem: {
        owner: { avatarUrl, htmlUrl, login },
        name,
        stargazersCount,
        updatedAt
    },
    onClick
}): JSX.Element => {
    return (
        <div className={`${styles.repoTile}`} onClick={onClick}>
            <div className={`${styles.repoTile__avatar}`}>
                <Avatar src={avatarUrl} letter={login.slice(1)} />
            </div>
            <div className={`${styles.repoTile__content}`}>
                <div className={`${styles.repoTile__title}`}>{name}</div>
                <a className={`${styles.repoTile__orgLink}`} href={htmlUrl}>
                    {login}
                </a>
                <div className={`${styles.repoTile__additionalInfo}`}>
                    <span className={`${styles.repoTile__iconRaiting}`}>
                        <StarIcon />
                    </span>
                    <span className={`${styles.repoTile__raitingInfo}`}>
                        {stargazersCount}
                    </span>
                    <span className={`${styles.repoTile__dateInfo}`}>
                        {`Updated ${dateFormat(updatedAt)}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RepoTile);
