import React from 'react';

import findIcon from './findIcon.svg';
import './SearchButton.css';

export type SearchButtonProps = {
    disabled?: boolean;
};

const SearchButton: React.FC<SearchButtonProps> = ({
    disabled
}): JSX.Element => {
    return (
        <button
            className={'search-button'}
            disabled={disabled ? true : undefined}
        >
            <img src={findIcon} alt='' />
        </button>
    );
};

export default SearchButton;
