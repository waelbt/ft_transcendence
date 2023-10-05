import React, { useEffect } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import InputField from './InputField';
import Alert from '../../components/Alert';
import './LoginRegisterForm.scss';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
};

export const LoginForm: React.FC<RegisterFormProps> = (props) => {
    const {
        register,
        // setValue,
        handleSubmit,
        formState: { errors },
        reset
        // getValues
    } = useForm();
    const onSubmit = async (data: FieldValues) => {
        // const dataToSend = {
        //     email: data.email,
        //     password: data.password,
        //     FullName: "yyy"
        // };
        console.log(data);

        // fetch('http://localhost:4000/auth/signin/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(dataToSend)
        // })
        //     .then((res) => res.json())
        //     .then((responseData) => console.log(responseData))
        //     .catch(() => console.error('Error zzz'));

        reset();
    };

    useEffect(() => {
        console.log('error : ', errors);
    }, [errors]);
    // const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');
    // Wrap the FormLabelInput component with forwardRef so that we can access its DOM instance.
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
                {Object.keys(errors).length ? (
                    <Alert
                        type="error"
                        message={errors[Object.keys(errors)[0]]?.message}
                    />
                ) : null}
                <button className="form-btn">
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
