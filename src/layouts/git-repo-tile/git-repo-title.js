import React from "react";

import './git-repo-tile.css'
import './__title/git-repo-tile__title.css'
import './__org-link/git-repo-tile__org-link.css'
import './__additional-info/git-repo-tile__additional-info.css'
import './__avatar/git-repo-tile__avatar.css'
import './__content/git-repo-tile__content.css'

import starIcon from './../img/starIcon.svg'

const GitRepoTitle = ({avatar, title, orgLink, raiting, date}) => {
    return <div className='git-repo-tile'>
        <div className='git-repo-tile__avatar'>
            <img src={avatar} alt='avatar'/>
        </div>
        <div className='git-repo-tile__content'>
            <div className='git-repo-tile__title'>
                {title}
            </div>
            <div className='git-repo-tile__org-link'>
                <a href='/'>
                    {orgLink}
                </a>
            </div>
            <div className='git-repo-tile__additional-info'>
                <img src={starIcon} alt=''/>
                <span>{raiting}</span>
                <span>{date}</span>
            </div>
        </div>

    </div>;
};

export default GitRepoTitle;