import './index.scss';

type AvatarProps = {
    src: string;
};

function Avatar(props: AvatarProps) {
    return (<div className="avatar-container">
        <img src={props.src} alt="Avatar" className="avatar-image" />
    </div>);
}

export default Avatar;


// import React, { useState, useEffect, FC } from 'react';
// import Loader from './Loader';  // Import the Loader component from its file

// const Avatar: FC = () => {
//     const [isUploaded, setIsUploaded] = useState(false);
//     const [path, setPath] = useState('');
//     const [isImageLoading, setIsImageLoading] = useState(!!path);

//     const handleImageLoad = () => {
//         setIsImageLoading(false);
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPath(reader.result as string);
//                 setIsUploaded(true);
//                 setIsImageLoading(true);  // Set loading to true when a new image is uploaded
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     useEffect(() => {
//         if (isImageLoading) {
//             // Your logic to update the Loader progress based on image loading, if needed
//         }
//     }, [isImageLoading]);

//     return (
//         <div className="avatar">
//             <label
//                 htmlFor="file-upload"
//                 className={`uploader ${isUploaded ? 'has-image' : ''}`}
//             >
//                 {path ? (
//                     <>
//                         <img
//                             src={path}
//                             loading="lazy"
//                             alt="Avatar"
//                             className="image"
//                             onLoad={handleImageLoad}  // Attach the load event handler
//                         />
//                         {isImageLoading && <Loader />}  // Conditionally render the Loader
//                     </>
//                 ) : (
//                     <input
//                         className="placeholder"
//                         id="file-upload"
//                         type="file"
//                         onChange={handleFileChange}
//                     />
//                 )}
//             </label>
//         </div>
//     );
// };

// export default Avatar;