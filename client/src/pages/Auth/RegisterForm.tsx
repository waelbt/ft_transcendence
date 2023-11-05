import { useEffect } from 'react';
import FormComponent from '../../components/FormComponent';
import { useRegister, RegisterData } from '../../hooks/authHooks';
import { type FieldValues } from 'react-hook-form';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

export const RegisterForm = (props: RegisterFormProps) => {
    const { mutate, isSuccess } = useRegister();

    const onSubmit = async (data: FieldValues) => {
        const entries = Object.entries(data);
        const newEntries = entries.slice(0, -1);
        const newData = Object.fromEntries(newEntries);
        mutate(newData as RegisterData);
    };

    useEffect(() => {
        if (isSuccess) props.onFormSwitch('login');
    }, [isSuccess]);

    const fields = [
        {
            label: 'Full name',
            type: 'text',
            placeholder: 'Wael boutzougarte',
            name: 'fullName',
            validation: {
                required: 'Full name is required'
            }
        },
        {
            label: 'Email',
            type: 'text',
            placeholder: 'example@youremail.com',
            name: 'email',
            validation: {
                required: 'Email address is required!',
                pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Please enter a valid email address.'
                }
            }
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            validation: {
                required: 'Password is required!',
                maxLength: {
                    value: 40,
                    message: 'Password must be less than 40 characters'
                },
                minLength: {
                    value: 5,
                    message: 'Password must be at least 5 characters'
                }
            },
            secure: true
        },
        {
            label: 'Confirm Password',
            type: 'password',
            name: 'confirmPassword',
            validation: {
                required: 'Confirm password is required'
            },
            secure: true
        }
    ];

    return (
        <>
            <FormComponent
                fields={fields}
                onSubmit={onSubmit}
                btn={{
                    style: '',
                    type: 'submit',
                    text: 'Sign up'
                }}
            />
            <div
                className="text-white font-Acme text-base font-normal leading-normal"
                onClick={() => props.onFormSwitch('login')}
            >
                Don't have an account?{' '}
                <span className="text-pink hover:underline">Register here</span>
            </div>
        </>
    );
};
