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
            <div className="flex flex-col justify-start items-start gap-[7px] w-full">
                <label className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    {label}{' '}
                </label>
                <input
                    style={
                        disabled
                            ? {
                                  opacity: '0.8',
                                  pointerEvents: 'none',
                                  color: 'grey'
                              }
                            : {}
                    }
                    className={`w-full bg-white border-b-2 text-center border-gray-400 justify-start items-center gap-2.5 inline-flex  outline-none  text-black text-lg font-normal font-['Acme']`}
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