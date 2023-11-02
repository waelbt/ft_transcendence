import React, { useState } from 'react';
// import './index.scss';

type InputFieldProps = {
    label: string;
    type: string;
    placeholder?: string;
    register: any;
    secure?: boolean;
};

function InputField({
    label,
    type,
    placeholder,
    register,
    secure
}: InputFieldProps) {
    const [visible, setvisible] = useState(false);

    return (
        <div className="flex flex-col items-start space-y-1">
            {label && (
                <label
                    className="text-white text-shadow font-Acme text-base font-normal"
                    style={{ lineHeight: '1.25rem' }}
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    className="flex 
                    py-2.5 pr-14 pl-2.5 
                    justify-center 
                    items-center 
                    gap-2.5 
                    rounded-lg 
                    bg-white 
                    text-PrimaryBlue 
                    font-Acme 
                    text-xl 
                    font-normal 
                    "
                    style={{
                        lineHeight: '1.5rem',
                        border: '0.125rem solid #304194'
                    }}
                    // custom-width
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
}

export default InputField;
