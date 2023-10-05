import React, { useState } from 'react';
import './InputField.scss';

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
            {label && (
                <label className="form-label">
                    {label}
                </label>
            )}
            <div className="pwd">
                <input
                    className="form-input"
                    type={visible ? 'text' : type}
                    placeholder={placeholder}
                    {...register}
                />
                {secure ? (
                    <span
                        className="p-viewer"
                        onClick={() => setvisible(!visible)}
                    >
                        <i
                            className={`fa fa-eye${visible ? '-slash' : ''}`}
                        ></i>
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default InputField;

// import React, { useState, forwardRef } from 'react';
// import { UseFormRegister, FieldValues } from 'react-hook-form';
// import './InputField.scss';

// type InputFieldProps = {
//     label: string;
//     type: string;
//     register?: UseFormRegister<FieldValues>;
//     secure?: boolean;
// };

// const InputField: React.FC<InputFieldProps> = ({
//     label,
//     type,
//     register,
//     secure
// }) => {
//     const [visible, setvisible] = useState(false);
//     const EmailInputField = forwardRef<HTMLInputElement, InputFieldProps>(
//         InputField
//     );
//     return (
//         <div className="form-label-input">
//             {label && (
//                 <label className="form-label" htmlFor="name">
//                     {label}
//                 </label>
//             )}
//             <div className="pwd">
//                 <input
//                     className="form-input"
//                     type={visible ? 'text' : type}
//                     {...register}
//                 />

//             </div>
//         </div>
//     );
// };

// export default InputField;
