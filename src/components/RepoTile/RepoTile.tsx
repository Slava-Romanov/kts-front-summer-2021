import React from 'react';

import './RepoTile.css';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';

import { RepoItem } from '../../store/GitHubStore/types';

export type RepoTileProps = {
    RepoItem: RepoItem;
    onClick: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({
    RepoItem,
    onClick
}): JSX.Element => {
    const dateFormat = (date: string) => {
        const dateF: Date = new Date(date);
        return dateF.toDateString();
    };

    return (
        <div className={'repo-tile'} onClick={onClick}>
            <div className='repo-tile__avatar'>
                <Avatar
                    src={RepoItem.owner.avatar_url}
                    letter={RepoItem.owner.login.slice(1)}
                />
            </div>
            <div className='repo-tile__content'>
                <div className='repo-tile__title'>{RepoItem.name}</div>
                <a
                    className='repo-tile__org-link'
                    href={RepoItem.owner.html_url}
                >
                    {RepoItem.owner.login}
                </a>
                <div className='repo-tile__additional-info'>
                    <span className='repo-tile__icon-raiting'>
                        <StarIcon />
                    </span>
                    <span className='repo-tile__raiting-info'>
                        {RepoItem.stargazers_count}
                    </span>
                    <span className='repo-tile__date-info'>
                        {`Updated ${dateFormat(RepoItem.updated_at)}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RepoTile);
