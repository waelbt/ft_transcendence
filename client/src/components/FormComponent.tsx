import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Field {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    disabled?: boolean;
    validation?: any;
}

interface FormProps {
    fields: Field[];
    onSubmit: (data: any) => void;
    defaultValues?: { [key: string]: any };
}

const FormComponent: React.FC<FormProps> = ({
    fields,
    onSubmit,
    defaultValues = {}
}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({ defaultValues });

    const prevWatchedFieldsRef = useRef<{ [key: string]: any }>({});
    const watchedFields = watch();
    const [filledFields, setFilledFields] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        // Check if watched fields have changed
        let hasChanged = false;
        for (const key of Object.keys(watchedFields)) {
            if (watchedFields[key] !== prevWatchedFieldsRef.current[key]) {
                hasChanged = true;
                break;
            }
        }

        if (hasChanged) {
            // Update the filledFields state
            const updatedFilledFields = fields.reduce(
                (acc, field) => {
                    acc[field.name] = !!watchedFields[field.name];
                    return acc;
                },
                {} as { [key: string]: boolean }
            );
            setFilledFields(updatedFilledFields);
        }

        // Update the ref with the current watched fields
        prevWatchedFieldsRef.current = watchedFields;

        // Error handling for form submission
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
    }, [fields, watchedFields, isSubmitting, errors]);
    return (
        <form
            className="flex flex-col items-center space-y-3 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {fields.map((field, idx) => (
                <div
                    key={idx}
                    className="flex flex-col justify-start items-start gap-[7px] w-full"
                >
                    <label className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                        {field.label}
                    </label>
                    <input
                        style={
                            filledFields[field.name]
                                ? { borderColor: 'black' }
                                : { borderColor: 'gray' }
                        }
                        className={`w-full bg-white border-b-2 text-center justify-start items-center gap-2.5 inline-flex outline-none text-black text-lg font-normal font-['Acme']`}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name, field.validation)}
                        disabled={field.disabled}
                    />
                </div>
            ))}
        </form>
    );
};

export default FormComponent;
