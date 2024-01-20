import CodeInput from './CodeInput';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { isAxiosError } from 'axios';
import { useUserStore } from '../stores/userStore';

const TwoFA = () => {
    const [code, setCode] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { F2A, updateState } = useUserStore();

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
                updateState({ F2A: true });
            } catch (error) {
                if (isAxiosError(error)) {
                    updateState({ F2A: true });

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

    useEffect(() => {
        const GenerateQRCode = async () => {
            try {
                const response = await axiosPrivate.get('/2fa/generate');
                const base64Image = response.data.qrCode;

                // Set the background image of the div
                if (canvasRef.current) {
                    canvasRef.current.style.backgroundImage = `url(${base64Image})`;
                    canvasRef.current.style.backgroundSize = 'cover'; // Adjust as needed
                }
            } catch (error) {
                console.error('Error fetching QR code:', error);
                // Handle error (e.g., show toast notification)
            }
        };

        GenerateQRCode();
    }, [axiosPrivate]);
    return (
        <div style={F2A ? { opacity: 0.3, pointerEvents: 'none' } : {}}>
            {' '}
            {/* Apply the style conditionally */}
            <div className="w-[202px] h-[203px]" ref={canvasRef} />
            <div className="justify-center items-center gap-2 inline-flex">
                <div className="w-[130px] h-[0px] border border-zinc-400"></div>
                <div className="text-center text-zinc-400 text-sm font-light font-['Poppins']">
                    enter code
                </div>
                <div className="w-[130px] h-[0px] border border-zinc-400"></div>
            </div>
            <div className="flex-col justify-center items-center gap-5 flex">
                <CodeInput
                    setter={setCode}
                    style="w-[30px] h-10 text-center text-black text-xl relative bg-white
                rounded-[10px] border border-neutral-400"
                />
            </div>
        </div>
    );
};

export default TwoFA;
