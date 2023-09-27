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
    const [visible, setvisible] = useState(false);

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
                    className="form-input" // remove id and use classname
                    type={visible ? 'text' : type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    id={value}
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
