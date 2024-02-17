import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import toast from 'react-hot-toast';

type FormProps = {
    fields: any[];
    // btn?: any;
    onSubmit?: (data: any) => void;
    defaultValues?: any;
    errors?: any;
};

function FormComponent({
    fields,
    // btn,
    onSubmit,
    defaultValues = {}
}: FormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ defaultValues });

    useEffect(() => {
        if (isSubmitting) {
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                const errorMessage = errors[firstErrorKey]?.message;
                if (typeof errorMessage === 'string') {
                    toast.dismiss();
                    toast.error(errorMessage);
                }
            }
        }
    }, [errors, isSubmitting]);

    return (
        <form
            className="flex flex-col items-center space-y-3 w-full"
            onSubmit={handleSubmit(onSubmit)} //! fix this later
        >
            {fields.map((field, idx) => {
                return (
                    <InputField
                        key={idx}
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        register={register(field.name, field.validation)}
                        disabled={isSubmitting || field.disabled}
                        // secure={field.secure}
                    />
                );
            })}
            {/* {true ? (
                <div className="w-full flex-col justify-center items-center gap-3 inline-flex">
                    <button
                        // ${
                        // isSubmitting ? 'cursor-not-allowed bg-dark-pink' : ''
                        // }`
                        // ? style the disabled state
                        // className={btn.style}
                        // type={btn.type}
                        disabled={isSubmitting}
                    >
                        test
                    </button>
                </div>
            ) : null} */}
        </form>
    );
}

export default FormComponent;
