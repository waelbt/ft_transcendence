import React, { ChangeEvent, useState } from 'react';

type InputFieldProps = {
    label: string;
    placeholder?: string;
    type: string;
    secure?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    type,
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
                    className="form-input" // remove id and use classname
                    type={visible ? 'text' : type}
                    value={state}
                    onChange={handleChange}
                    placeholder={placeholder}
                    id={state}
                    name={label.toLowerCase()} // hadi 5assha tbdl ndir name li kay iban achno hadak l input
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
