import React from 'react';

import './GitRepoTile.css';

import starIcon from './../img/starIcon.svg';

export type GitRepoTileProps = {
    avatar: string;
    title: string;
    orgLink: string;
    raiting: number;
    date: string;
};

const GitRepoTile: React.FC<GitRepoTileProps> = ({
    avatar,
    title,
    orgLink,
    raiting,
    date
}): JSX.Element => {
    return (
        <div className={'git-repo-tile'}>
            <img
                className={'git-repo-tile__avatar'}
                src={avatar}
                alt='avatar'
            />
            <div className='git-repo-tile__content'>
                <div className={'git-repo-tile__title'}>{title}</div>
                <a className={'git-repo-tile__org-link'} href='/'>
                    {orgLink}
                </a>
                <div className={'git-repo-tile__additional-info'}>
                    <img
                        className={'git-repo-tile__icon-raiting'}
                        src={starIcon}
                        alt=''
                    />
                    <span className={'git-repo-tile__raiting-info'}>
                        {raiting}
                    </span>
                    <span className={'git-repo-tile__date-info'}>{date}</span>
                </div>
            </div>
        </div>
    );
};

export default GitRepoTile;
