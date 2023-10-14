import React, { useState } from 'react';
import './index.scss';

type InputFieldProps = {
    label: string;
    type: string;
    placeholder?: string;
    register: any;
    secure?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    placeholder,
    register,
    secure
}) => {
    const [visible, setvisible] = useState(false);

    return (
        <div className="form-label-input">
            {label && <label className="form-label">{label}</label>}
            <div className="pwd">
                <input
                    className="form-input"
                    type={visible ? 'text' : type}
                    placeholder={placeholder}
                    {...register}
                />
                {secure ? (
                    <span
                        className={`${visible ? 'closed' : 'eye'}`}
                        onClick={() => setvisible(!visible)}
                    ></span>
                ) : null}
            </div>
        </div>
    );
};

export default InputField;
