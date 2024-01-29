import { FC } from 'react';
import { IoMdImages } from 'react-icons/io';
import { CiImageOff } from 'react-icons/ci';
interface AvatarProps {
    imageUrl: string | null | undefined;
    state?: string;
    style?: string;
    isloading?: boolean;
    errror?: boolean;
}

const Avatar: FC<AvatarProps> = ({
    imageUrl,
    state,
    style,
    isloading,
    errror
}) => {
    return (
        <>
            <div
                className={` items-start gap-2 relative inline-block border-2 border-dashed border-grey-900 rounded-full hover:border-pink uploader cursor-pointer avatar  rela
                ${state ? state : ''} ${
                    imageUrl ? 'border-none' : ''
                } ${style}  `}
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
                {!imageUrl && (
                    <>
                        <div className="flex  justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            {!errror ? (
                                <IoMdImages
                                    className="text-stone-600"
                                    size={28}
                                />
                            ) : (
                                <CiImageOff
                                    className="text-stone-600"
                                    size={28}
                                />
                            )}
                        </div>
                    </>
                )}
                {isloading && <div className="loading-overlay"></div>}
            </div>
        </>
    );
};

export default Avatar;
