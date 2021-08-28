import React from "react";
import './input.css'

const Input = ({disabled = false}) => {
    return <input placeholder='Введите название организации' className='input' disabled={disabled ? true:''}/>;
};

export default Input;