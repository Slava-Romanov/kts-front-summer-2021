import React from 'react';

import './RepoTile.css';
import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { RepoItem } from '@store/GitHubStore/types';
import { dateFormat } from '@utils/utils';

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
        <div className={'repo-tile'} onClick={onClick}>
            <div className='repo-tile__avatar'>
                <Avatar src={avatar_url} letter={login.slice(1)} />
            </div>
            <div className='repo-tile__content'>
                <div className='repo-tile__title'>{name}</div>
                <a className='repo-tile__org-link' href={html_url}>
                    {login}
                </a>
                <div className='repo-tile__additional-info'>
                    <span className='repo-tile__icon-raiting'>
                        <StarIcon />
                    </span>
                    <span className='repo-tile__raiting-info'>
                        {stargazers_count}
                    </span>
                    <span className='repo-tile__date-info'>
                        {`Updated ${dateFormat(updated_at)}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RepoTile);
