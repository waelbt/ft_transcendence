import { useState } from 'react';
import QRCode from 'qrcode.react';

const TwoFA = () => {
    const [is2FAActive, setIs2FAActive] = useState(false);

    const [token, setToken] = useState('');

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const verifyToken = () => {
        console.log('Verifying token:', token);
    };
    const [qrCodeData, setQrCodeData] = useState('');

    const activate2FA = () => {
        setIs2FAActive(true);
        setQrCodeData(
            'otpauth://totp/Example:user@example.com?secret=BASE32SECRET&issuer=Example'
        );
    };

    return (
        <div className="p-8 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">
                Two Factor Authentication
            </h2>

            {!is2FAActive ? (
                <div>
                    <p className="mb-4">
                        Download the Google Authenticator app from the app store
                        and scan the QR code below.
                    </p>

                    <QRCode value={qrCodeData} className="mb-4" />
                    <button
                        onClick={activate2FA}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Activate 2FA
                    </button>
                </div>
            ) : (
                <div>
                    <p className="mb-4">
                        Please enter the 2FA token from the Google Authenticator
                        app:
                    </p>

                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        onChange={handleTokenChange}
                    />

                    <button
                        onClick={verifyToken}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Verify Token
                    </button>
                </div>
            )}
        </div>
    );
};

export default TwoFA;
