import React, { ChangeEvent, useState } from 'react';

interface InputFieldProps {
    value: string;
    label: string;
    placeholder?: string;
    type: string;
    onChange: (value: string) => void;
    secure?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    value,
    label,
    placeholder,
    type,
    onChange,
    secure
}) => {
    const [visible, setvisible] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onChange(value);
    };
    return (
        <div className="form-label-input">
            {label && (
                <label className="form-label" htmlFor="name">
                    {label}
                </label>
            )}
            <div className="pwd">
                <input
                    className="form-input"
                    type={type}
                    value={
                        secure
                            ? value
                                  .split('')
                                  .reduce((result) => result + '*', '')
                            : value
                    }
                    onChange={handleChange}
                    placeholder={placeholder}
                    id={value}
                    name={value}
                />
                {secure ? (
                    <span
                        className="p-viewer"
                        onClick={() =>
                            visible === ''
                                ? setvisible('-slash')
                                : setvisible('')
                        }
                    >
                        <i className={`fa fa-eye${visible}`}></i>
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default InputField;
