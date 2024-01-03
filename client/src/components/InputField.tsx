type InputFieldProps = {
    label?: string;
    type?: string;
    placeholder?: string;
    register?: any;
    disabled: boolean;
    // secure?: boolean;
};

function InputField({
    label,
    type,
    placeholder,
    register,
    disabled
}: InputFieldProps) {
    return (
        <>
            <div className="flex flex-col justify-start items-start gap-[7px]">
                <label className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    {label}{' '}
                </label>
                <input
                    className={`w-96 pl-5 pr-2.5 py-2.5 ${
                        disabled ? 'bg-zinc-100' : 'bg-white'
                    } rounded-[10px] border-2 border-gray-200 justify-start items-center gap-2.5 inline-flex text-start text-neutral-400 text-base font-normal font-['Poppins']`}
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    disabled={disabled} // Correctly apply the disabled prop
                />
            </div>
        </>
    );
}

export default InputField;
