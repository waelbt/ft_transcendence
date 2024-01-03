import { useState } from 'react';
import QRCode from 'qrcode.react';

const TwoFA = () => {
    const [is2FAActive, setIs2FAActive] = useState(false);
    const [token, setToken] = useState('');
    const [qrCodeData, setQrCodeData] = useState('');

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const verifyToken = () => {
        console.log('Verifying token:', token);
    };

    const activate2FA = () => {
        setIs2FAActive(true);
        setQrCodeData(
            'otpauth://totp/Example:user@example.com?secret=BASE32SECRET&issuer=Example'
        );
    };

    return (
        <div className="px-5 py-2 bg-gray-100 rounded-[5px] flex-col justify-start items-start gap-[5px] inline-flex w-[600px] h-[270px]">
            <h2 className="text-center text-neutral-500 text-[22px] font-normal font-['Acme']">
                Two Factor Authentication
            </h2>

            {!is2FAActive ? (
                <div className="flex-col justify-start items-start gap-1 inline-flex">
                    <p className="text-neutral-400 text-base font-light font-['Poppins']">
                        Download the Google Authenticator app from the app store
                        and scan the QR code below.
                    </p>
                    <div className="pl-12 justify-center items-center gap-10 inline-flex">
                        <QRCode value={qrCodeData} size={150} />{' '}
                        {/* Set a fixed size for the QRCode */}
                        <button
                            onClick={activate2FA}
                            className="bg-stone-300 hover:bg-stone-500 rounded-[5px] px-2 py-1 flex-col  gap-2.5 flex text-center text-white text-[22px] font-normal font-['Acme']"
                        >
                            Activate 2FA
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-col justify-start items-start gap-2 inline-flex">
                    <div className='text-neutral-400 text-base font-light font-["Poppins"] mb-6'>
                        Please enter the 2FA token from the Google Authenticator
                        app:
                    </div>
                    <input
                        type="text"
                        className="border border-gray-300 bg-white rounded p-2 w-full mb-4"
                        onChange={handleTokenChange}
                    />
                    <div className="justify-start items-start gap-4 inline-flex">
                        <button
                            onClick={verifyToken}
                            className="bg-stone-300  hover:bg-stone-500  text-white font-bold py-2 px-4 rounded"
                        >
                            Verify Token
                        </button>
                        <button
                            onClick={() => {
                                setIs2FAActive(false);
                            }}
                            className="bg-stone-300  hover:bg-stone-500  text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwoFA;
