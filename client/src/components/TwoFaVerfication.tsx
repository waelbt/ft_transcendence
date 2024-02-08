import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CodeInput from './CodeInput';
import { isAxiosError } from 'axios';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { useDebounce } from '../hooks/debouncerHook';

function TwoFaVerfication() {
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const axiosPrivate = useAxiosPrivate();
    const { updateState } = useUserStore();
    const debouncedValue = useDebounce<string[]>(code, 500);

    const handleChange =
        (index: number) => (event: FormEvent<HTMLInputElement>) => {
            const newCode = [...code];
            newCode[index] = event.currentTarget.value;

            setCode(newCode);

            if (event.currentTarget.value && index <= code.length - 1) {
                document.getElementById(`input-${index + 1}`)?.focus();
            }
        };

    const validateCode = async () => {
        try {
            const codeString = code.join('');
            if (!/^[0-9]+$/.test(codeString)) {
                toast.error('Error: input is invalid: value is not a number');
                return;
            }
            const response = await axiosPrivate.post('/2fa/validate', {
                Code: codeString // Send the code as a JSON object
            });
            toast.success(response.data.message);
            updateState({ verified: true });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        } finally {
            setCode(['', '', '', '', '', '']);
            document.getElementById(`input-0`)?.focus();
        }
    };

    useEffect(() => {
        if (code.every((char) => char !== '')) {
            validateCode();
        }
    }, [debouncedValue]);
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
            <CodeInput code={code} HandleChangeType={handleChange}  />
        </div>
    );
}

export default TwoFaVerfication;
