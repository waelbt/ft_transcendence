import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import './index.scss';
// import Alert from '../Alert';

type FormProps = {
    fields: any[];
    onSubmit: (data: any) => void;
    defaultValues?: any;
    errors?: any;
};

export const FormComponent: React.FC<FormProps> = ({
    fields,
    onSubmit,
    defaultValues = {}
    // errors = {}
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm({ defaultValues });

    useEffect(() => {
    }, [errors]);

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, idx) => {
                return (
                    <InputField
                        key={idx}
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        register={register(field.name, field.validation)}
                        secure={field.secure}
                    />
                );
            })}
            {/* {Object.keys(errors).length && <Alert type="error" message={errors[Object.keys(errors)[0]]?.message} />} */}
            <button
                className={`form-btn ${isSubmitting ? 'disabled-btn' : ''}`}
                disabled={isSubmitting}
                type="submit"
            >
                Log in
            </button>
        </form>
    );
};
