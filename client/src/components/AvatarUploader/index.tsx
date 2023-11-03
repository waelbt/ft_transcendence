import ProgressRingLoader from '../ProgressRingLoader';
// import './index.scss';

import React, { useEffect, FC, useRef, useState } from 'react';

interface AvatarProps {
    imageUrl: string | null;
    upload: boolean;
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

const AvatarUploader: FC<AvatarProps> = ({
    imageUrl,
    upload,
    onchange,
    reset
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [progress, setProgress] = useState(0);

    const post = () => {
        intervalRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 10;
                if (newProgress === 100) {
                    clearInterval(intervalRef.current as NodeJS.Timeout); // clear the interval when progress reaches 100
                }
                console.log(newProgress);
                return newProgress;
            });
        }, 1000);
    };
    useEffect(() => {
        //client side
        if (containerRef && containerRef.current) {
            containerRef.current.style.background = imageUrl
                ? `url(${imageUrl}) 50% / cover no-repeat`
                : '';
        }
        //server side
        if (upload && imageUrl) {
            post();
        }
    }, [upload, imageUrl]);

    return (
        <>
            <div className="absolute top-0 left-0">
                {upload ? (
                    <ProgressRingLoader
                        radius={66}
                        stroke={4}
                        progress={progress}
                    />
                ) : null}
            </div>
            <div
                className="rounded-full absolute top-0 left-0"
                ref={containerRef}
            >
                <label
                    htmlFor="file-upload"
                    className={`w-25 h-25 rounded-full border-2 border-dashed border-white cursor-pointer flex items-center justify-center bg-cover bg-no-repeat bg-center overflow-hidden p-0.5 transition-border duration-0
                     ${imageUrl ? 'border-0 bg-transparent' : ''}`}
                    style={{
                        // backgroundImage: 'url(../../assets/icons/ImageSquare.svg)',
                        backgroundSize: '1.625rem'
                    }}
                >
                    <input
                        className="w-[80%] h-[80%] object-cover rounded-full absolute top-0 left-0 hidden"
                        id="file-upload"
                        type="file"
                        onChange={onchange}
                    />
                </label>
                {imageUrl ? (
                    <span
                        className="reset-avatar"
                        onClick={() => {
                            reset();
                            clearInterval(
                                intervalRef.current as NodeJS.Timeout
                            );
                            setProgress(0);
                        }}
                    >
                        <a className="trash-icon"></a>
                    </span>
                ) : null}
            </div>
        </>
    );
};

export default AvatarUploader;
