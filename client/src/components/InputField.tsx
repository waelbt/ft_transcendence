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
    register
} // secure
: InputFieldProps) {
    // const [visible, setvisible] = useState(false);

    return (
        <div className="flex-col justify-start items-start gap-4 inline-flex">
            {label && (
                <label className="text-black text-lg font-bold font-openSans leading-tight">
                    {label}
                </label>
            )}
            <input
                className="
                pl-[5px] pb-0.5 bg-white border-b-2 border-neutral-400 justify-start items-center inline-flex
                    "

                // custom-width
                type={type}
                placeholder={placeholder}
                {...register}
            />
        </div>
    );
}

export default InputField;
