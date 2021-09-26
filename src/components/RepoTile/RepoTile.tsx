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
        <div className={`${styles.repoTile}`} onClick={onClick}>
            <div className={`${styles.repoTile__avatar}`}>
                <Avatar src={avatar_url} letter={login.slice(1)} />
            </div>
            <div className={`${styles.repoTile__content}`}>
                <div className={`${styles.repoTile__title}`}>{name}</div>
                <a className={`${styles.repoTile__orgLink}`} href={html_url}>
                    {login}
                </a>
                <div className={`${styles.repoTile__additionalInfo}`}>
                    <span className={`${styles.repoTile__iconRaiting}`}>
                        <StarIcon />
                    </span>
                    <span className={`${styles.repoTile__raitingInfo}`}>
                        {stargazers_count}
                    </span>
                    <span className={`${styles.repoTile__dateInfo}`}>
                        {`Updated ${dateFormat(updated_at)}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RepoTile);
