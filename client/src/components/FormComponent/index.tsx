import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import toast from 'react-hot-toast';
// import './index.scss';

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
        <form className="flex flex-col items-center space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
            // ${
                // isSubmitting ? 'cursor-not-allowed bg-darkPink' : ''
            // }`
                className={`flex mt-2 ml-auto mr-auto py-1.5 px-28 justify-center items-center space-x-2.5 border-0 rounded-full bg-PrimaryBlue text-white text-center font-BombSound text-2xl font-normal leading-normal ${btn.style} hover:bg-pink`}
                type={btn.type}
                disabled={isSubmitting}
            >
                {btn.text}
            </button>
        </form>
    );
}

export default FormComponent;
