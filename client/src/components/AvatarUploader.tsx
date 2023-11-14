// import ProgressRingLoader from '../ProgressRingLoader';
// import './index.scss';

// import React, { useEffect, FC, useRef, useState } from 'react';
import React, { useEffect, FC, useRef } from 'react';
import ProgressRingLoader from './ProgressRingLoader';
// import { api as axios } from '../axios-utils'; // nsmiha request
interface AvatarProps {
    imageUrl: string | null;
    upload: boolean;
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

// !add the upload endpoint + fix logic 
const AvatarUploader: FC<AvatarProps> = ({
    imageUrl,
    // upload,
    onchange,
    reset
}) => {
    const containerRef = useRef<HTMLLabelElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    // const [progress, setProgress] = useState(0);

    // const post = () => {
    //     intervalRef.current = setInterval(() => {
    //         setProgress((prevProgress) => {
    //             const newProgress = prevProgress + 10;
    //             if (newProgress === 100) {
    //                 clearInterval(intervalRef.current as NodeJS.Timeout); // clear the interval when progress reaches 100
    //             }
    //             console.log(newProgress);
    //             return newProgress;
    //         });
    //     }, 1000);
    // };
    useEffect(() => {
        //client side
        if (containerRef && containerRef.current) {
            containerRef.current.style.background = imageUrl
                ? `url(${imageUrl}) 50% / cover no-repeat`
                : '';
        }
        // server side

        // if (upload && imageUrl) post();
        //     var formData = new FormData();
        //     formData.append('file', imageUrl);
        //     axios({
        //         method: 'post',
        //         url: '/upload',
        //         data: formData, //format data
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         },
        //         onUploadProgress: function (progressEvent) {
        //             if (progressEvent && progressEvent.total) {
        //                 let percentCompleted = Math.round(
        //                     (progressEvent.loaded * 100) / progressEvent.total
        //                 );
        //                 console.log(`Upload progress: ${percentCompleted}%`);
        //             }
        //         }
        //     })
        //         .then((response) => {
        //             console.log('File uploaded successfully:', response.data);
        //         })
        //         .catch((error) => {
        //             console.error('Error uploading file:', error);
        //         });
        // }
    }, [imageUrl]);

    return (
        <>
            <label
                ref={containerRef}
                htmlFor="file-uploader"
                className={`flex items-start gap-2 relative p-12 border-2 border-dashed border-white rounded-full hover:border-pink uploader  ${
                    imageUrl ? 'border-none' : ''
                }`}
            >
                <ProgressRingLoader
                    style={
                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    }
                    radius={54}
                    stroke={2}
                    progress={0}
                />
                {!imageUrl ? (
                    <div className="flex w-6 h-6 justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg
                            width="27"
                            height="26"
                            viewBox="0 0 27 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.6562 10.5625C11.3293 10.5625 11.875 10.0168 11.875 9.34375C11.875 8.67065 11.3293 8.125 10.6562 8.125C9.98315 8.125 9.4375 8.67065 9.4375 9.34375C9.4375 10.0168 9.98315 10.5625 10.6562 10.5625Z"
                                fill="white"
                            />
                            <path
                                d="M21.625 3.25H5.375C4.94402 3.25 4.5307 3.4212 4.22595 3.72595C3.9212 4.0307 3.75 4.44402 3.75 4.875V21.125C3.75 21.556 3.9212 21.9693 4.22595 22.274C4.5307 22.5788 4.94402 22.75 5.375 22.75H21.625C22.056 22.75 22.4693 22.5788 22.774 22.274C23.0788 21.9693 23.25 21.556 23.25 21.125V4.875C23.25 4.44402 23.0788 4.0307 22.774 3.72595C22.4693 3.4212 22.056 3.25 21.625 3.25ZM18.7102 11.375C18.4042 11.0736 17.992 10.9046 17.5625 10.9046C17.133 10.9046 16.7208 11.0736 16.4148 11.375L11.875 15.9148L9.77266 13.8125C9.46673 13.5111 9.05449 13.3421 8.625 13.3421C8.19551 13.3421 7.78327 13.5111 7.47734 13.8125L5.375 15.9148V4.875H21.625V14.2898L18.7102 11.375Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                ) : (
                    <span // ! render this element whem the loader finished
                        className=" absolute bg-[#ff0000] p-1 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 border border-blue-opacity-80 border-solid"
                        onClick={() => {
                            reset();
                            clearInterval(
                                intervalRef.current as NodeJS.Timeout
                            );
                            // setProgress(0);
                        }}
                    >
                        <a className="w-9 h-9 flex-shrink-0 bg-center bg-cover relative">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="Trash-d">
                                    <path
                                        id="Vector"
                                        d="M14.0625 3.9375V14.625C14.0625 14.7741 14.0032 14.9172 13.8977 15.0227C13.7922 15.1282 13.6491 15.1875 13.5 15.1875H4.5C4.35086 15.1875 4.20776 15.1282 4.10229 15.0227C3.99683 14.9172 3.9375 14.7741 3.9375 14.625V3.9375H14.0625Z"
                                        fill="white"
                                        fillOpacity="0.1"
                                    />
                                    <path
                                        id="Vector_2"
                                        d="M15.1875 3.375H2.8125C2.50184 3.375 2.25 3.62684 2.25 3.9375C2.25 4.24816 2.50184 4.5 2.8125 4.5H15.1875C15.4982 4.5 15.75 4.24816 15.75 3.9375C15.75 3.62684 15.4982 3.375 15.1875 3.375Z"
                                        fill="white"
                                    />
                                    <path
                                        id="Vector_3"
                                        d="M6.75 7.3125V11.8125C6.75 12.1232 7.00184 12.375 7.3125 12.375C7.62316 12.375 7.875 12.1232 7.875 11.8125V7.3125C7.875 7.00184 7.62316 6.75 7.3125 6.75C7.00184 6.75 6.75 7.00184 6.75 7.3125Z"
                                        fill="white"
                                    />
                                    <path
                                        id="Vector_4"
                                        d="M10.125 7.3125V11.8125C10.125 12.1232 10.3768 12.375 10.6875 12.375C10.9982 12.375 11.25 12.1232 11.25 11.8125V7.3125C11.25 7.00184 10.9982 6.75 10.6875 6.75C10.3768 6.75 10.125 7.00184 10.125 7.3125Z"
                                        fill="white"
                                    />
                                    <path
                                        id="Vector_5"
                                        d="M4.5 14.625V3.9375C4.5 3.62684 4.24816 3.375 3.9375 3.375C3.62684 3.375 3.375 3.62684 3.375 3.9375V14.625C3.375 15.091 3.70451 15.4205 3.70451 15.4205C4.03401 15.75 4.5 15.75 4.5 15.75H13.5C13.966 15.75 14.2955 15.4205 14.2955 15.4205C14.625 15.091 14.625 14.625 14.625 14.625V3.9375C14.625 3.62684 14.3732 3.375 14.0625 3.375C13.7518 3.375 13.5 3.62684 13.5 3.9375V14.625H4.5Z"
                                        fill="white"
                                    />
                                    <path
                                        id="Vector_6"
                                        d="M6.11926 1.61926C5.625 2.11351 5.625 2.8125 5.625 2.8125V3.9375C5.625 4.24816 5.87684 4.5 6.1875 4.5C6.49816 4.5 6.75 4.24816 6.75 3.9375V2.8125C6.75 2.5795 6.91475 2.41475 6.91475 2.41475C7.07951 2.25 7.3125 2.25 7.3125 2.25H10.6875C10.9205 2.25 11.0852 2.41475 11.0852 2.41475C11.25 2.5795 11.25 2.8125 11.25 2.8125V3.9375C11.25 4.24816 11.5018 4.5 11.8125 4.5C12.1232 4.5 12.375 4.24816 12.375 3.9375V2.8125C12.375 2.11352 11.8807 1.61926 11.8807 1.61926C11.3865 1.125 10.6875 1.125 10.6875 1.125H7.3125C6.61351 1.125 6.11926 1.61926 6.11926 1.61926Z"
                                        fill="white"
                                    />
                                </g>
                            </svg>
                        </a>
                    </span>
                )}
                <input
                    id="file-uploader"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        onchange(e);
                        e.stopPropagation();
                    }}
                />
            </label>
        </>
    );
};

export default AvatarUploader;
