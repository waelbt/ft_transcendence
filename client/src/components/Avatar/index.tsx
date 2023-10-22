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
// import progress from 'fetch-progress';

// interface AvatarProps {
//   imageUrl: string;
// }

// const Avatar: FC<AvatarProps> = ({ imageUrl }) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [loadPercentage, setLoadPercentage] = useState<number>(0);

//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     fetch(imageUrl, { signal })
//       .then(progress({
//         onProgress: (progressEvent) => {
//           const percentage = (progressEvent.loaded / progressEvent.total) * 100;
//           setLoadPercentage(percentage);
//         },
//       }))
//       .then(response => response.blob())
//       .then(blob => {
//         setLoading(false);
//         const objectURL = URL.createObjectURL(blob);
//         document.getElementById('avatar-image')?.src = objectURL;  // Using optional chaining in case the element is not found
//       })
//       .catch(error => {
//         if (error.name === 'AbortError') {
//           console.log('Fetch aborted');
//         } else {
//           console.error('Fetch error:', error);
//         }
//       });

//     return () => controller.abort();  // Abort fetch on component unmount
//   }, [imageUrl]);

//   return (
//     <div>
//       {loading && <div>Loading: {loadPercentage.toFixed(2)}%</div>}
//       <img id="avatar-image" alt="avatar" />
//     </div>
//   );
// };

// export default Avatar;
