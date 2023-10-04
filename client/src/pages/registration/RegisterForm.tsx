import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import './LoginRegisterForm.scss';
import { useForm, type FieldValues } from 'react-hook-form';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    // const [data, setData] = useState<FieldValues>({});
    const {
        register,
        // setValue,
        handleSubmit,
        // formState: { errors },
        // formState: { errors, isSubmitting },
        reset
        // getValues
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        // TODO: submit to server
        // ...
        console.log(data);
        

        reset();
    };

    return (
        <React.Fragment>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Full name"
                    type="text"
                    placeholder="Wael boutzougarte"
                    register={
                        (register('fullName'),
                        {
                            required: 'Full name is required'
                        })
                    }
                />
                <InputField
                    label="Email"
                    type="email"
                    placeholder="example@youremail.com"
                    register={
                        (register('email'),
                        {
                            required: 'Email is required'
                        })
                    }
                />
                <InputField
                    label="Password"
                    type="hide"
                    register={
                        (register('password'),
                        {
                            required: 'password is required'
                        })
                    }
                    secure
                />
                <InputField
                    label="Confirm Password"
                    type="hide"
                    register={register('confirmPassword', {
                        required: 'Confirm password is required'
                        // validate: (value) =>
                        //     value === getValues('password') ||
                        //     'Passwords must match Confirm password'
                    })}
                    secure
                />
                <button
                    className="form-btn"
                    // disabled={isSubmitting}
                    type="submit"
                >
                    <span className="button-text">Sign up</span>
                </button>
            </form>
            <div
                className="form-label"
                onClick={() => props.onFormSwitch('login')}
            >
                already have an account?{' '}
                <span className="form-link">Log-in</span>
            </div>
        </React.Fragment>
    );
};

// const inputFieldProps = [
//     {
//         label: 'Full name',
//         type: 'text',
//         placeholder: 'Wael boutzougarte'
//     },
//     {
//         label: 'Email',
//         type: 'email',
//         placeholder: 'example@youremail.com'
//     },
//     {
//         label: 'Password',
//         type: 'hide',
//         placeholder: '',
//         secure: true
//     },
//     {
//         label: 'Confirm Password',
//         type: 'hide',
//         placeholder: '',
//         secure: true
//     }
// ];
