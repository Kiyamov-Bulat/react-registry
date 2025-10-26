import React, { FC } from 'react';
import s from './styles.module.scss';

type FilterInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
};

export const FilterInput: FC<FilterInputProps> = ({
    value,
    onChange,
    placeholder,
}) => {
    return (
        <input
            type="text"
            value={value}
            autoFocus={true}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={s.filterInput}
            data-component="filter-input"
        />
    );
};
