import FormComponent from '../src/components/FormComponent';
import { type FieldValues } from 'react-hook-form';
import { LoginData, useLogin } from '../src/hooks/authHooks';

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
                    // TODO: store this in a custom style proprty
                    style: 'flex mt-2 ml-auto mr-auto py-1.5 px-28 justify-center items-center space-x-2.5 \
                           border -0 rounded-full bg-primary-blue text-white text-center font-BombSound \
                            text-2xl font-normal leading-normal hover:bg-pink ',
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
