import React, { ChangeEvent, useState } from 'react';
import './InputField.scss';

type InputFieldProps = {
    label: string;
    type: string;
    placeholder?: string;
    secure?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    placeholder,
    secure
}) => {
    const [visible, setvisible] = useState(false);
    const [state, SetState] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        SetState(value);
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
                    type={visible ? 'text' : type}
                    value={state}
                    onChange={handleChange}
                    placeholder={placeholder}
                    id={state}
                    name={label.toLowerCase()}
                />
                {secure ? (
                    <span
                        className="p-viewer"
                        onClick={() => setvisible(!visible)}
                    >
                        <i
                            className={`fa fa-eye${visible ? '' : '-slash'}`}
                        ></i>
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default InputField;
