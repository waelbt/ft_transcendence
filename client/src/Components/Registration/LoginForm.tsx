import { FormComponent } from './Components/FormComponent';
import { type FieldValues } from 'react-hook-form';
import { api as axios } from '../../Api/';
// import './Components/FormComponent/index.scss'

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

export const LoginForm = (props : RegisterFormProps) => {
    const onSubmit = async (data: FieldValues) => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000))
            const response = await axios.post('/auth/signin/', data);
            console.log(response.data);
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
            type: 'password', //hide
            name: 'password',
            validation: {
                required: 'Password is required!'
            }
        }
    ];

    return (
        <>
            <FormComponent fields={fields} onSubmit={onSubmit} />
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
