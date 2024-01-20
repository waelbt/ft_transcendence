import { MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CodeInput from './CodeInput';

// ! code

// const [code, setCode] = useState(['', '', '', '', '', '']);
// const [isInputValid, setIsInputValid] = useState<boolean>(false);

// const handleCodeChange = (newCode: string[]) => {
//     setCode(newCode);
//     // Validate the code and set the input validity
//     // Example validation: checking if all elements are numbers and the array is full

//     setIsInputValid(isValid);
// };

function TwoFaVerfication() {
    const [code, setCode] = useState<string>('');

    // const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    //     e.preventDefault();
    //     console.log(code);
    //     if (code.length === 6 && /^[0-9]+$/.test(code)) {
    //         // ! post request to the server
    //     } else {
    //         toast.error('invalid code format');
    //     }
    // };

    useEffect(() => {
        // && /^[0-9]+$/.test(code)
        if (code.length === 6) {
            console.log(code);
        }
    }, [code]);
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
            <CodeInput setter={setCode} />
            {/* <button
                className="px-3 py-2 rounded-[10px] border bg-black hover:bg-gray-800 border-stone-300 justify-center items-center gap-3 inline-flex  text-center text-white text-[22px] font-normal font-['Acme'] "
                onClick={handleSubmit}
                // disabled={!isInputValid}
            >
                continue
            </button> */}
        </div>
    );
}

export default TwoFaVerfication;
