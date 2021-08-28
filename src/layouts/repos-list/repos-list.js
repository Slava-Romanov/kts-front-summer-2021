import React from "react";
import './repos-list.css'
import './__search/repos-list__search.css'
import './__repos/repos-list__repos.css'
import Input from "../input/input";
import SearchButton from "../search-button/search-button";
import GitRepoTitle from "../git-repo-tile/git-repo-title";
import avatarImg from "../img/avatar.png";
import avatarImg2 from "../img/avatar2.png";

const ReposList = ({disabled = false}) => {
    return <div className="repos-list">
        <div className="repos-list__search">
            <Input/><SearchButton/>
        </div>
        <div className="repos-list__repos">
            <GitRepoTitle avatar={avatarImg} title="kts-school-frontend" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg} title="very-long-repository-name-and-long" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg2} title="very-long-repository-name-and-long" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg} title="kts-school-frontend" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg} title="very-long-repository-name-and-long" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg2} title="very-long-repository-name-and-long" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg} title="kts-school-frontend" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg} title="very-long-repository-name-and-long" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg2} title="very-long-repository-name-and-long" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg} title="kts-school-frontend" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg} title="very-long-repository-name-and-long" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
            <GitRepoTitle avatar={avatarImg2} title="very-long-repository-name-and-long" orgLink="ktsstudio" raiting="123" date="Updated 21 Jul"/>
        </div>
    </div>;
};

export default ReposList;