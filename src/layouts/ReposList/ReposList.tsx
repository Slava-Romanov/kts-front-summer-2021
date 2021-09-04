import React from 'react';
import './ReposList.css';

import GitRepoTile, { GitRepoTileProps } from '../GitRepoTile';
import avatarImg from '../img/avatar.png';
import avatarImg2 from '../img/avatar2.png';
import Input from '../Input';
import SearchButton from '../SearchButton';

const data: GitRepoTileProps[] = [
    {
        avatar: avatarImg,
        title: 'kts-school-frontend',
        orgLink: 'ktsstudio',
        raiting: 123,
        date: 'Updated 21 Jul'
    },
    {
        avatar: avatarImg,
        title: 'very-long-repository-name-and-long',
        orgLink: 'ktsstudio',
        raiting: 123,
        date: 'Updated 21 Jul'
    },
    {
        avatar: avatarImg2,
        title: 'very-long-repository-name-and-long',
        orgLink: 'ktsstudio',
        raiting: 123,
        date: 'Updated 21 Jul'
    },
    {
        avatar: avatarImg,
        title: 'kts-school-frontend',
        orgLink: 'ktsstudio',
        raiting: 123,
        date: 'Updated 21 Jul'
    },
    {
        avatar: avatarImg,
        title: 'very-long-repository-name-and-long',
        orgLink: 'ktsstudio',
        raiting: 123,
        date: 'Updated 21 Jul'
    },
    {
        avatar: avatarImg2,
        title: 'very-long-repository-name-and-long',
        orgLink: 'ktsstudio',
        raiting: 123,
        date: 'Updated 21 Jul'
    }
];

const ReposList = () => {
    return (
        <div className={'repos-list'}>
            <div className={'repos-list__search'}>
                <Input />
                <SearchButton />
            </div>
            <div className={'repos-list__repos'}>
                {data.map((item, index) => (
                    <GitRepoTile
                        key={index}
                        avatar={item.avatar}
                        title={item.title}
                        orgLink={item.orgLink}
                        raiting={item.raiting}
                        date={item.date}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReposList;
