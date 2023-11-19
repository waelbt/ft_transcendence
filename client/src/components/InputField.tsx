import React, { useState } from 'react';
// import './index.scss';

type InputFieldProps = {
    label?: string;
    type?: string;
    placeholder?: string;
    register?: any;
    // secure?: boolean;
};

// ! add the eye icons
function InputField({
    label,
    type,
    placeholder,
    register // secure
}: InputFieldProps) {
    // const [visible, setvisible] = useState(false);

    return (
        <>
            <div className="flex flex-col justify-start items-start gap-1.5">
                <label className="text-black text-lg font-bold font-sans leading-tight">
                    {label}{' '}
                </label>
                <input
                    className="w-[385px] pl-1 pb-0.5 bg-white border-b-2 border-neutral-400 justify-start items-center text-black text-lg font-normal font-sans leading-normal !outline-none"
                    type={type}
                    placeholder={placeholder}
                    {...register}
                />
            </div>
        </>
    );
}

export default InputField;
