import CodeInput from './CodeInput';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { isAxiosError } from 'axios';
import { useUserStore } from '../stores/userStore';
import { IoIosLock } from 'react-icons/io';
import { absoluteToast } from '../tools';

const TwoFA = () => {
    const [code, setCode] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { F2A, updateState } = useUserStore();
    const [image, setImage] = useState<string | null>(null);
    useEffect(() => {
        const validateCode = async () => {
            // var formData = new FormData();
            // formData.append('text', code);
            try {
                const response = await axiosPrivate.post(
                    '/2fa/validate',
                    {
                        Code: code // Send the code as a JSON object
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                absoluteToast(toast.success, response.data.message);
                updateState({ F2A: true });
            } catch (error) {
                if (isAxiosError(error)) {
                    updateState({ F2A: false }); //! false
                    absoluteToast(toast.error, error.response?.data.message);
                }
            }
        };

        if (code.length === 6) {
            console.log(code);
            if (/^[0-9]+$/.test(code)) {
                console.log(code);
                validateCode();
            } else {
                absoluteToast(
                    toast.error,
                    'Error: input is invalid: value is not a number'
                );
            }
        }
    }, [code]);

    const toggleLock = async () => {
        try {
            await axiosPrivate.post('/2fa/disable');
            updateState({ F2A: false });
            absoluteToast(toast.success, '2FA disable successfully');
        } catch (error) {
            if (isAxiosError(error))
                absoluteToast(
                    toast.error,
                    " We're having a little trouble disabling 2FA right now.  Please try again in a few minutes."
                );
        }
        // ! post to /2fa/desable
    };
    useEffect(() => {
        const GenerateQRCode = async () => {
            try {
                const response = await axiosPrivate.get('/2fa/generate');
                setImage(response.data.qrCode);
                console.log(image);
            } catch (error) {
                console.error('Error fetching QR code:', error);
                // Handle error (e.g., show toast notification)
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
                        setter={setCode}
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

// // Import CSS keyframes from styled-components

// // Keyframe animations for lock/unlock

// const TwoFA = () => {
//     const [code, setCode] = useState<string>('');
//     const [isLocked, setIsLocked] = useState(true); // New state for lock status
//     // ... rest of your states and useEffects

//     // Toggle lock/unlock

//     return (
//         <div className="relative">
//             {isLocked ? (
//                 <StyledLockIcon
//                     className="text-black absolute bottom-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//                     size={77}
//                     onClick={toggleLock}
//                 />
//             ) : (
//                 <StyledUnlockIcon
//                     className="text-black absolute bottom-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//                     size={77}
//                     onClick={toggleLock}
//                 />
//             )}
//             <div
//                 style={
//                     isLocked
//                         ? {
//                               filter: 'blur(4px)',
//                               pointerEvents: 'none'
//                           }
//                         : {}
//                 }
//                 className="flex-col justify-center items-center inline-flex gap-6"
//             >
//                 {/* Rest of your component */}
//             </div>
//         </div>
//     );
// };

// export default TwoFA;

// Import CSS keyframes from styled-components
// import styled, { keyframes } from 'styled-components';

// // Keyframe animations for lock/unlock
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const StyledLockIcon = styled(IoIosLock)`
//   animation: ${fadeIn} 0.5s;
// `;

// const StyledUnlockIcon = styled(IoIosUnlock)`
//   animation: ${fadeIn} 0.5s;
// `;

// const TwoFA = () => {
//     const [code, setCode] = useState<string>('');
//     const [isLocked, setIsLocked] = useState(true); // New state for lock status
//     // ... rest of your states and useEffects

//     // Toggle lock/unlock
//     const toggleLock = () => {
//         setIsLocked(!isLocked);
//         updateState({ F2A: !isLocked });
//         // Additional logic if needed
//     };

//     return (
//         <div className="relative">
//             {isLocked ? (
//                 <StyledLockIcon
//                     className="text-black absolute bottom-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//                     size={77}
//                     onClick={toggleLock}
//                 />
//             ) : (
//                 <StyledUnlockIcon
//                     className="text-black absolute bottom-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//                     size={77}
//                     onClick={toggleLock}
//                 />
//             )}
//             <div
//                 style={
//                     isLocked
//                         ? {
//                               filter: 'blur(4px)',
//                               pointerEvents: 'none'
//                           }
//                         : {}
//                 }
//                 className="flex-col justify-center items-center inline-flex gap-6"
//             >
//                 {/* Rest of your component */}
//             </div>
//         </div>
//     );
// };

// export default TwoFA;
