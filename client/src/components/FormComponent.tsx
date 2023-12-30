import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import toast from 'react-hot-toast';

type FormProps = {
    fields: any[];
    btn: any;
    onSubmit: (data: any) => void;
    defaultValues?: any;
    errors?: any;
};

function FormComponent({
    fields,
    btn,
    onSubmit,
    defaultValues = {}
}: FormProps) {
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
    }, [errors, isSubmitting]);
    return (
        <form
            className="flex flex-col items-center space-y-3"
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
                        // secure={field.secure}
                    />
                );
            })}
            <div className="w-full flex-col justify-end items-end gap-3 inline-flex">
                <button
                    // ${
                    // isSubmitting ? 'cursor-not-allowed bg-dark-pink' : ''
                    // }`
                    // ? style the disabled state
                    className={btn.style}
                    type={btn.type}
                    disabled={isSubmitting}
                >
                    {btn.text}
                </button>
            </div>
        </form>
    );
}

export default FormComponent;
