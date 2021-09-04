import React from 'react';

import './ReposListContainer.css';
import ReposList from '../ReposList';

const ReposListContainer = () => {
    return (
        <div className={'repos-list-container'}>
            <ReposList />
        </div>
    );
};

export default ReposListContainer;
