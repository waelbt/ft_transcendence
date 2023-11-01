import ProgressRingLoader from '../ProgressRingLoader';
import './index.scss';

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
            <div className="animation child">
                {upload ? (
                    <ProgressRingLoader
                        radius={66}
                        stroke={4}
                        progress={progress}
                    />
                ) : null}
            </div>
            <div className="avatar child" ref={containerRef}>
                <label
                    htmlFor="file-upload"
                    className={`uploader  ${imageUrl ? 'has-image' : ''}`}
                >
                    <input
                        className="placeholder child"
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
