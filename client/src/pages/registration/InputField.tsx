import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    value: string;
    label: string;
    placeholder?: string;
    type: string;
    onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    value,
    label,
    placeholder,
    type,
    onChange
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onChange(value);
    };
    // <div className="form-group">
    //     {label && <label htmlFor="input-field">{label}</label>}
    //     <input
    //         type={type}
    //         value={value}
    //         className="form-control"
    //         placeholder={placeholder}
    //         onChange={handleChange}
    //     />
    // </div>;
    return (
        <div className="form-label-input">
            {label && <label className="form-label" htmlFor="name">{label}</label>}
            <input
                className="form-input"
                type={type}
                aria-hidden
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                id={value}
                name={value}
            />
        </div>
    );
};

export default InputField;
