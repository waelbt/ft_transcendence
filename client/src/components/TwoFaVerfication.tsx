import { FormEvent, MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';

function TwoFaVerfication() {
    const [code, setCode] = useState(['', '', '', '', '', '']); // Assuming a two-character code
    const [isInputValid, setIsInputValid] = useState<boolean>(false);

    const handleChange =
        (index: number) => (event: FormEvent<HTMLInputElement>) => {
            const newCode = [...code];
            newCode[index] = event.currentTarget.value;
            setCode(newCode);
            /^[0-9]+$/.test(newCode[index])
                ? setIsInputValid(true)
                : setIsInputValid(false);
            if (event.currentTarget.value && index < code.length - 1) {
                document.getElementById(`input-${index + 1}`)?.focus();
            }
            console.log(code);
        };

    const handleSubmit = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // ! if not valid toast here and alsoremove the style
        // If the input is valid, proceed with submitting the form
        if(isInputValid)
        {
            toast.error("nssiti hadi")
        }
        console.log('Form submitted with value:', code.join(''));
        // Add your submit logic
        // ? navigate
    };
    return (
        <div className="h-80 flex-col justify-center items-center gap-[50px] inline-flex">
            <div className=" flex-col justify-center items-start gap-[30px] flex">
                <div className="text-neutral-900 text-[40px] font-normal font-['Acme']">
                    Welcome Back !
                </div>
                <div className="text-center text-zinc-900 text-xl font-normal font-['Poppins']">
                    Enter code from your two-factor authentication app
                </div>
            </div>
            <div className="justify-center items-center gap-[15px] inline-flex">
                {' '}
                {/* Adjust gap as needed */}
                {code.map((c, index) => (
                    <input
                        key={index}
                        id={`input-${index}`}
                        type="text"
                        maxLength={1}
                        value={c}
                        onChange={handleChange(index)}
                        className="w-16 h-14  text-center text-black text-xl relative bg-white rounded-[10px] border border-neutral-400"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                ))}
            </div>
            <button
                className="px-3 py-2 rounded-[10px] border bg-black hover:bg-gray-800 border-stone-300 justify-center items-center gap-3 inline-flex  text-center text-white text-[22px] font-normal font-['Acme'] "
                onClick={handleSubmit}
                // disabled={!isInputValid}
            >
                continue
            </button>
        </div>
    );
}

export default TwoFaVerfication;
