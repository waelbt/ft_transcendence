// import ProgressRingLoader from '../ProgressRingLoader';
// import './index.scss';

// import React, { useEffect, FC, useRef, useState } from 'react';
import React, { useEffect, FC, useRef } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
// import { TbCameraPlus } from 'react-icons/tb';
import { IoMdImages } from 'react-icons/io'; // import ProgressRingLoader from './ProgressRingLoader';
import { IconContext } from 'react-icons';
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
                className={`flex items-start gap-2 relative p-14 border-2 border-dashed border-grey-900 rounded-full hover:border-pink uploader  ${
                    imageUrl ? 'border-none' : ''
                }`}
            >
                {/* <ProgressRingLoader
                    style={
                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    }
                    radius={65}
                    stroke={2}
                    progress={100}
                /> */}
                {!imageUrl ? (
                    <div className="flex  justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <IoMdImages size={28} />
                    </div>
                ) : (
                    <span // ! render this element whem the loader finished
                        className=" absolute bg-[#f9164f] p-1.5 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 border-4  border-white border-solid"
                        onClick={() => {
                            reset();
                            clearInterval(
                                intervalRef.current as NodeJS.Timeout
                            );
                            // setProgress(0);
                        }}
                    >
                        <a className="w-9 h-9 flex-shrink-0 bg-center bg-cover relative">
                            <IconContext.Provider
                                value={{
                                    color: '#FFFFFF'
                                }}
                            >
                                <IoTrashOutline size={21}/>
                            </IconContext.Provider>
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
