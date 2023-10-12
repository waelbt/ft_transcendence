import React from 'react';
import InputField from '../../src/Components/Registration/Components/InputField';
import Alert from '../components/Alert';
import { api as axios } from '../../src/Api';
import { useForm, type FieldValues } from 'react-hook-form';
import './LoginRegisterForm.scss';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { confirmPassword, ...newData } = data;

        try {
            const response = await axios.post('/auth/signup/', newData);
            console.dir(response);
        } catch (error) {
            console.error(error);
        }
        reset();
    };

    return (
        <React.Fragment>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Full name"
                    type="text"
                    placeholder="Wael boutzougarte"
                    register={register('fullName', {
                        required: 'Full name is required'
                    })}
                />
                <InputField
                    label="Email"
                    type="text"
                    placeholder="example@youremail.com"
                    register={register('email', {
                        required: 'Email address is required!',
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Please enter a valid email address.'
                        }
                    })}
                />
                <InputField
                    label="Password"
                    type="hide"
                    register={register('password', {
                        required: 'password is required'
                    })}
                    secure
                />
                <InputField
                    label="Confirm Password"
                    type="hide"
                    register={register('confirmPassword', {
                        required: 'Confirm password is required',
                        validate: (value) =>
                            value === getValues('password') ||
                            'Passwords must match confirm password'
                    })}
                    secure
                />
                {/* {Object.keys(errors).length ? (
                    <Alert
                        type="error"
                        message={errors[Object.keys(errors)[0]]?.message}
                    />
                ) : null} */}
                <button
                    className={`form-btn ${isSubmitting ? 'disabled-btn' : ''}`}
                    disabled={isSubmitting}
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
