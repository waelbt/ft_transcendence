import { FC, useRef } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { IoMdImages } from 'react-icons/io';
import { IconContext } from 'react-icons';

interface AvatarProps {
    imageUrl: string | null;
    onCLick: (event: React.MouseEvent<HTMLElement>) => void;
}

// !add the upload endpoint + fix logic
const Avatar: FC<AvatarProps> = ({ imageUrl, onCLick }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div
                ref={containerRef}
                className={`flex items-start gap-2 relative p-14 border-2 border-dashed border-grey-900 rounded-full hover:border-pink uploader cursor-pointer ${
                    imageUrl ? 'border-none' : ''
                }`}
                style={
                    imageUrl
                        ? {
                              backgroundImage: `url(${imageUrl})`,
                              backgroundPosition: '50%',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat'
                          }
                        : {}
                }
            >
                {!imageUrl ? (
                    <>
                        <div className="flex  justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <IoMdImages size={28} />
                        </div>
                    </>
                ) : (
                    <span
                        className="absolute bg-[#f9164f] p-0.5 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white border-solid flex justify-center items-center z-10"
                        onClick={(event) => onCLick(event)}
                    >
                        <div className="w-9 h-9 flex justify-center items-center">
                            {' '}
                            {/* Adjusted tag and classes for centering */}
                            <IconContext.Provider value={{ color: '#FFFFFF' }}>
                                <IoTrashOutline size={22} />
                            </IconContext.Provider>
                        </div>
                    </span>
                )}
            </div>
        </>
    );
};

export default Avatar;

// import React, { useEffect, FC, useRef, useState } from 'react';
// import ProgressRingLoader from './ProgressRingLoader';
// import axios from 'axios';

// upload: boolean;
// onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// reset: () => void;

// htmlFor="file-uploader"

{
    /* <input id="file-uploader" type="file" className="hidden" />; */
}
{
}
