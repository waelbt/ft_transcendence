import { FormComponent } from './Components/FormComponent';
import { type FieldValues } from 'react-hook-form';
import { api as axios } from '../../Api/';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

export const RegisterForm = (props: RegisterFormProps) => {
    const onSubmit = async (data: FieldValues) => {
        const { confirmPassword, ...newData } = data;
        try {
            const response = await axios.post('/auth/signup/', newData);
            console.dir(response);
        } catch (error) {
            console.error(error);
        }
    };

    const fields = [
        {
            label: "Full name",
            type: "text",
            placeholder: "Wael boutzougarte",
            name: "fullName",
            validation: {
                required: 'Full name is required'
            }
        },
        {
            label: "Email",
            type: "text",
            placeholder: "example@youremail.com",
            name: "email",
            validation: {
                required: 'Email address is required!',
                pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Please enter a valid email address.'
                }
            }
        },
        {
            label: "Password",
            type: "hide",
            name: "password",
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
            label: "Confirm Password",
            type: "hide",
            name: "confirmPassword",
            validation: {
                required: 'Confirm password is required',
                // validate: (value, getValues) => value === getValues('password') || 'Passwords must match confirm password'
            },
            secure: true
        }
    ];

    return (
        <>
            <FormComponent fields={fields} onSubmit={onSubmit} />
            <div
                className="form-label"
                onClick={() => props.onFormSwitch('login')}
            >
                Don't have an account?{' '}
                <span className="form-link">Register here</span>
            </div>
        </>
    );
};
