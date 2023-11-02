import FormComponent from '../../components/FormComponent';
import { type FieldValues } from 'react-hook-form';
import { LoginData, useLogin } from '../../hooks/authHooks';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

export const LoginForm = (props: RegisterFormProps) => {
    const { mutate } = useLogin();

    const onSubmit = async (data: FieldValues) => {
        mutate(data as LoginData);
    };

    const fields = [
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
                    text: 'Log in'
                }}
            />
            <div
                className="text-white font-Acme text-base font-normal leading-normal"
                onClick={() => props.onFormSwitch('register')}
            >
                Don't have an account?{' '}
                <span className="text-pink hover:underline">Register here</span>
            </div>
        </>
    );
};
