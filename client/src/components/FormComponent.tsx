import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../deprecated/InputField';
import toast from 'react-hot-toast';

type FormProps = {
    fields: any[];
    // btn?: any;
    onSubmit: (data: any) => void;
    defaultValues?: any;
    errors?: any;
};

function FormComponent({ fields, onSubmit, defaultValues = {} }: FormProps) {
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
                    <div
                        key={idx}
                        className="flex flex-col justify-start items-start gap-[7px] w-full"
                    >
                        <label className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                            {field.label}
                        </label>
                        <input
                            style={
                                field.disabled
                                    ? {
                                          opacity: '0.8',
                                          pointerEvents: 'none',
                                          color: 'grey'
                                      }
                                    : {}
                            }
                            className={`w-full bg-white border-b-2 text-center border-gray-400 justify-start items-center gap-2.5 inline-flex  outline-none  text-black text-lg font-normal font-['Acme']`}
                            type={field.type}
                            placeholder={field.placeholder}
                            {...register(field.name, field.validation)}
                            disabled={field.disabled}
                        />
                    </div>
                );
            })}
        </form>
    );
}

export default FormComponent;
