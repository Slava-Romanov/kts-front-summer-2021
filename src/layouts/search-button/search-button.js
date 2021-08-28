import React from "react";
import './search-button.css'
import findIcon from './../img/findIcon.svg'

const SearchButton = ({disabled = false}) => {
    return <button className='search-button' disabled={disabled ? true:''}>
        <img src={findIcon} alt=''/>
    </button>;
};

export default SearchButton;