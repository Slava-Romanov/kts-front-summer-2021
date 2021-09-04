import React from 'react';
import './Input.css';

export type InputProps = {
    disabled?: boolean;
};

const Input: React.FC<InputProps> = ({ disabled }): JSX.Element => {
    return (
        <input
            placeholder='Введите название организации'
            className={'input'}
            disabled={disabled ? true : undefined}
        />
    );
};

export default Input;
