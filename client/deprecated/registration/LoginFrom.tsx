import React, { useEffect } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import InputField from '../../src/Components/Registration/Components/InputField';
// import Alert from '../components/Alert';
import { api as axios } from '../../src/Api';
import './LoginRegisterForm.scss';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

export const LoginForm: React.FC<RegisterFormProps> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000))
            const response = await axios.post('/auth/signin/', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        reset();
    };

    useEffect(() => {
        console.log('error : ', errors);
    }, [errors]);
    return (
        <React.Fragment>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
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
                        required: 'Password is required!',
                        maxLength: {
                            value: 40,
                            message: 'Password must be less then 40 characters'
                        },
                        minLength: {
                            value: 5,
                            message: 'Password must be at least 5 characters'
                        }
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
                    <span className="button-text">Log in</span>
                </button>
            </form>
            <div
                className="form-label"
                onClick={() => props.onFormSwitch('register')}
            >
                Don't have an account?{' '}
                <span className="form-link">Register here</span>
            </div>
        </React.Fragment>
    );
};
