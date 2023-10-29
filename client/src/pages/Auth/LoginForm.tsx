import FormComponent from '../../components/FormComponent';
import { type FieldValues } from 'react-hook-form';
import { api as axios } from '../../axios-utils';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

// type loginResponse = {
//     response: AxiosResponse<FieldValues>;
//     data: FieldValues;
//     error: AxiosError;
// };

export const LoginForm = (props: RegisterFormProps) => {
    // const mutation = useMutation<loginResponse, AxiosError, FieldValues>(
    //     (data) => axios.post('/auth/signin/', data),
    //     {
    //         onSuccess: (data) => {
    //             console.log('Login successful', data);
    //         },
    //         onError: (error) => {
    //             console.error('Login failed', error);
    //         }
    //     }
    // );

    // ...res\

    const onSubmit = async (data: FieldValues) => {
        try {
            console.log(data);
            const response = await axios.post('/auth/signin/', data);
            console.log(response.status);
        } catch (error) {
            console.error(error);
        }
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
                className="form-label"
                onClick={() => props.onFormSwitch('register')}
            >
                Don't have an account?{' '}
                <span className="form-link">Register here</span>
            </div>
        </>
    );
};
