import React, { FormEvent, useEffect, useState } from 'react';

interface CodeInputProps {
    setter: React.Dispatch<React.SetStateAction<string>>;
    style?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({
    setter,
    style = 'w-16 h-14 text-center text-black text-xl relative bg-white rounded-[10px] border border-neutral-400'
}) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);

    const handleChange =
        (index: number) => (event: FormEvent<HTMLInputElement>) => {
            const newCode = [...code];
            console.log(event.currentTarget.value);
            newCode[index] = event.currentTarget.value;
            console.log(newCode[index]);

            setCode(newCode);

            if (event.currentTarget.value && index <= code.length - 1) {
                document.getElementById(`input-${index + 1}`)?.focus();
            }
        };

    useEffect(() => {
        setter(code.join(''));
    }, [code]);

    return (
        <div className="justify-center items-center gap-[15px] inline-flex">
            {code.map((c, index) => (
                <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength={1}
                    value={c}
                    onChange={handleChange(index)}
                    className={style}
                    inputMode="numeric"
                    pattern="[0-9]*"
                />
            ))}
        </div>
    );
};

export default CodeInput;
