import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CodeInput from './CodeInput';
import { isAxiosError } from 'axios';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';

function TwoFaVerfication() {
    const [code, setCode] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const { updateState } = useUserStore();

    useEffect(() => {
        const validateCode = async () => {
            var formData = new FormData();
            formData.append('text', code);
            try {
                const response = await axiosPrivate.post(
                    '/2fa/validate',
                    formData
                );
                toast.success(response.data.message);
                updateState({ verified: true });
            } catch (error) {
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message);
                }
            }
        };

        if (code.length === 6) {
            console.log(code);
            if (/^[0-9]+$/.test(code)) {
                validateCode();
            } else {
                toast.error('Error: input is invalid: value is not a number');
            }
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
            <CodeInput setter={setCode} hide={false} />
        </div>
    );
}

export default TwoFaVerfication;
