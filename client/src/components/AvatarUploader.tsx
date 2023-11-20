import React, { useEffect, FC, useRef, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { IoMdImages } from 'react-icons/io';
import { IconContext } from 'react-icons';

import ProgressRingLoader from './ProgressRingLoader';
// import axios from 'axios';

interface AvatarProps {
    imageUrl: string | null;
    upload: boolean;
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

// !add the upload endpoint + fix logic
const AvatarUploader: FC<AvatarProps> = ({
    imageUrl,
    upload,
    onchange,
    reset
}) => {
    const containerRef = useRef<HTMLLabelElement | null>(null);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        //client side
        if (containerRef && containerRef.current) {
            containerRef.current.style.background = imageUrl
                ? `url(${imageUrl}) 50% / cover no-repeat`
                : '';
        }
        // server side

        if (upload && imageUrl) {
            setProgress(100);
            // var formData = new FormData();
            // formData.append('file', imageUrl);
            // axios.post('/users/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     },
            //     onUploadProgress: function (progressEvent) {
            //         if (progressEvent && progressEvent.total) {
            //             let percentCompleted = Math.round(
            //                 (progressEvent.loaded * 100) / progressEvent.total
            //             );
            //             setProgress(percentCompleted);
            //             console.log(`Upload progress: ${percentCompleted}%`);
            //         }
            //     }
            // });
        }
        // re
    }, [imageUrl]);

    return (
        <>
            <label
                ref={containerRef}
                // htmlFor="file-uploader"
                className={`flex items-start gap-2 relative p-14 border-2 border-dashed border-grey-900 rounded-full hover:border-pink uploader  ${
                    imageUrl ? 'border-none' : ''
                }`}
            >
                <ProgressRingLoader
                    style={
                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    }
                    radius={65}
                    stroke={2}
                    progress={progress}
                />
                {!imageUrl ? (
                    <>
                        <div className="flex  justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <IoMdImages size={28} />
                        </div>
                        <input
                            // id="file-uploader"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                e.stopPropagation();
                                onchange(e);
                                e.stopPropagation();
                            }}
                        />
                    </>
                ) : (
                    <span // ! render this element whem the loader finished
                        className=" absolute bg-[#f9164f] p-1.5 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4  border-white border-solid"
                        onClick={() => {
                            // if (containerRef && containerRef.current) {
                            //     containerRef.current.style.background = ''; 
                            // }
                            reset();
                            setProgress(0);
                        }}
                    >
                        <a className="w-9 h-9 flex-shrink-0 bg-center bg-cover relative">
                            <IconContext.Provider
                                value={{
                                    color: '#FFFFFF'
                                }}
                            >
                                <IoTrashOutline size={22} />
                            </IconContext.Provider>
                        </a>
                    </span>
                )}
            </label>
        </>
    );
};

export default AvatarUploader;
