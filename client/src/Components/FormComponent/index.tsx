import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import toast from 'react-hot-toast';
import './index.scss';

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
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues
    } = useForm({ defaultValues });

    useEffect(() => {
        if (isSubmitting) {
            const firstErrorKey = Object.keys(errors)[0];
                const confirmPassword = getValues('confirmPassword');

                toast.dismiss();
                if (
                    firstErrorKey &&
                    typeof errors[firstErrorKey]?.message === 'string'
                )
                    toast.error(errors[firstErrorKey]?.message as string);
                else if (
                    confirmPassword &&
                    confirmPassword != getValues('password')
                )
                    toast.error('Passwords must match confirm password');
        }
    }, [errors, isSubmitting])
    return (
        <form
            className="register-form"
            onSubmit={handleSubmit(onSubmit)}
        >
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
