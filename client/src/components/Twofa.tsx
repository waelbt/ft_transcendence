import CodeInput from './CodeInput';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { isAxiosError } from 'axios';
import { useUserStore } from '../stores/userStore';
import { IoIosLock } from 'react-icons/io';
import { FormEvent } from 'react';
import { useDebounce } from 'usehooks-ts';
const TwoFA = () => {
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const axiosPrivate = useAxiosPrivate();
    const { F2A, updateState } = useUserStore();
    const [image, setImage] = useState<string | null>(null);
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
            const response = await axiosPrivate.post(
                '/2fa/validate',
                {
                    Code: codeString // Send the code as a JSON object
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.success(response.data.message);
            updateState({ F2A: true });
        } catch (error) {
            if (isAxiosError(error)) {
                updateState({ F2A: false });
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

    const toggleLock = async () => {
        try {
            await axiosPrivate.post('/2fa/disable');
            updateState({ F2A: false });
            toast.success('2FA disable successfully');
        } catch (error) {
            if (isAxiosError(error))
                toast.error(
                    " We're having a little trouble disabling 2FA right now.  Please try again in a few minutes."
                );
        }
    };

    useEffect(() => {
        const GenerateQRCode = async () => {
            try {
                const response = await axiosPrivate.get('/2fa/generate');
                setImage(response.data.qrCode);
            } catch (error) {
                console.error('Error fetching QR code:', error);
            }
        };

        GenerateQRCode();
    }, []);

    return (
        <div className="relative">
            {F2A && (
                <IoIosLock
                    className="text-black absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    size={130}
                    onClick={toggleLock}
                />
            )}
            <div
                style={
                    F2A
                        ? {
                              filter: 'blur(4px)',
                              pointerEvents: 'none'
                          }
                        : {}
                }
                className="flex-col justify-cemter items-center inline-flex gap-6"
            >
                <div className="border border-gray-200 w-[202px] h-[203px] relative">
                    {image ? (
                        <img
                            src={image}
                            alt="QR Code"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src="/defaultQR.png"
                            alt="Loading placeholder"
                            className="absolute inset-0 w-full h-full object-cover animate-pulse bg-gray-200"
                            style={{ filter: 'blur(8px)' }}
                        />
                    )}
                </div>
                <div className="justify-center items-center gap-2 inline-flex">
                    <div className="w-[130px] h-[0px] border-t border-neutral-400"></div>
                    <div className="text-center text-neutral-400 text-sm font-light font-['Poppins']">
                        enter code
                    </div>
                    <div className="w-[130px] h-[0px] border-t border-neutral-400"></div>
                </div>
                <div className="flex-col justify-center items-center gap-5 flex">
                    <CodeInput
                        code={code}
                        HandleChangeType={handleChange}
                        hide={F2A}
                        style="w-[45px] h-[50px] text-center text-black text-xl relative bg-white
                rounded-[10px] border border-neutral-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default TwoFA;
