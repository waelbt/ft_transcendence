import { FC } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { IoMdImages } from 'react-icons/io';

interface AvatarProps {
    imageUrl: string | null;
    state?: string;
    style?: string;
    onCLick?: (event: React.MouseEvent<HTMLElement>) => void;
}

// ! /\\\\
const Avatar: FC<AvatarProps> = ({ imageUrl, state, style, onCLick }) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (onCLick && typeof onCLick === 'function') {
            onCLick(event);
        }
    };
    return (
        <>
            <div
                className={`${style} flex items-start gap-2 relative  border-2 border-dashed border-grey-900 rounded-full hover:border-pink uploader cursor-pointer avatar 
                ${state ? state : ''} ${imageUrl ? 'border-none' : ''}  `}
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
                ) : onCLick ? (
                    <span
                        className="absolute bg-[#f9164f] p-0.5 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white border-solid flex justify-center items-center z-10"
                        onClick={handleClick}
                    >
                        <div className="w-9 h-9 flex justify-center items-center">
                            {' '}
                            {/* <IconContext.Provider value={{ color: '#FFFFFF' }}> */}
                            <IoTrashOutline className="text-white" size={22} />
                            {/* </IconContext.Provider> */}
                        </div>
                    </span>
                ) : null}
            </div>
        </>
    );
};

export default Avatar;
