import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import './LoginRegisterForm.scss';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
};

export const LoginForm: React.FC<RegisterFormProps> = (props) => {
    const {
        register,
        // setValue,
        handleSubmit,
        // formState: { errors, isSubmitting },
        reset
        // getValues
    } = useForm();
    const onSubmit = async (data : any) => {
        // TODO: submit to server
        // ... 
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
        
        reset();
    };
    // const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');
    // Wrap the FormLabelInput component with forwardRef so that we can access its DOM instance.
    return (
        <React.Fragment>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Email"
                    type="email"
                    placeholder='example@youremail.com'
                    register={register('email')}
                />
                <InputField
                    label="Password"
                    type="hide"
                    register={register('password')}
                    secure
                />
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
