import './index.scss';

import React, { useEffect, FC, useRef } from 'react';
// import progress, { FetchProgressData } from 'fetch-progress';

// import progress from 'fetch-progress';

interface AvatarProps {
    imageUrl: string | null;
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

const AvatarUploader: FC<AvatarProps> = ({ imageUrl, onchange, reset }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [_, setLoadPercentage] = useState<number>(0);

    // Call the function to upload the image

    useEffect(() => {
        // const controller = new AbortController();
        // const signal = controller.signal;

        if (containerRef && containerRef.current) {
            containerRef.current.style.background = imageUrl
                ? `url(${imageUrl}) 50% / cover no-repeat`
                : '';
        }
        // if (imageUrl) {
        //     let currentPercentage = 0;
        
        //     // Function to simulate progress every 100ms
        //     const interval = setInterval(() => {
        //         currentPercentage += 10; // Increment percentage by 10%
        //         setLoadPercentage(currentPercentage);
        //         console.log(`${currentPercentage.toFixed(2)}%`);

        //         if (currentPercentage >= 100) {
        //             clearInterval(interval); // Stop the interval when 100% is reached
        //         }
        //     }, 100); // 100ms interval for a total of 1 second to reach 100%

        //     return () => {clearInterval(interval)}; // Clear interval on component unmount
        // }
    }, [[imageUrl]]);

    return (
        <>
            {/* <div className="animation child">
                <ProgressRingLoader controller={isUploaded && selectedItemIndex == null} />
            </div> */}
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
                    <span className="reset-avatar" onClick={reset}>
                        <a className="trash-icon"></a>
                    </span>
                ) : null}
            </div>
        </>
    );
};

export default AvatarUploader;

// <div>
//     {loading && <div>Loading: {loadPercentage.toFixed(2)}%</div>}
//     <img id="avatar-image" alt="avatar" />
// </div>

// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//         const formData = new FormData();
//         formData.append('image', file);  // 'image' is the field name, adjust based on your server's expectation

//         // Create a readable stream from the FormData
//         const { readable, writable } = new TransformStream();
//         formData.stream().pipeTo(writable);

//         let totalBytesWritten = 0;
//         const reader = readable.getReader();

//         // This function will be called recursively to read chunks
//         const readNextChunk = () => {
//             return reader.read().then(({ done, value }) => {
//                 if (done) {
//                     // When there's no more data left to read
//                     return;
//                 }
//                 totalBytesWritten += value.byteLength;
//                 setLoadPercentage((totalBytesWritten / file.size) * 100);
//                 return readNextChunk();  // Read the next chunk
//             });
//         };

//         readNextChunk();  // Start reading the first chunk

//         // Start the fetch with the readable stream as the body
//         fetch('YOUR_SERVER_ENDPOINT_HERE', {
//             method: 'POST',
//             body: readable
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('File uploaded successfully:', data);
//             setPath(data.path);  // Or any other state updates based on the server response
//         })
//         .catch(error => {
//             console.error('Error uploading file:', error);
//         });
//     }
// };

// // client side

// if (imageUrl) {
//     const formData = new FormData();
//     formData.append('image', imageUrl); // 'image' is the field name, adjust based on your server's expectation

//     // Create a readable stream from the FormData
//     const { readable, writable } = new TransformStream();

//     formData.stream().pipeTo(writable);
//     let totalBytesWritten = 0;
//     const reader = readable.getReader();

//     // // This function will be called recursively to read chunks
//     // const readNextChunk = () => {
//     //     return reader.read().then(({ done, value }) => {
//     //         if (done) {
//     //             // When there's no more data left to read
//     //             return;
//     //         }
//     //         totalBytesWritten += value.byteLength;
//     //         setLoadPercentage((totalBytesWritten / file.size) * 100);
//     //         return readNextChunk(); // Read the next chunk
//     //     });
//     // };

//     // readNextChunk(); // Start reading the first chunk

//     // Start the fetch with the readable stream as the body
//     fetch('https://postman-echo.com/post', {
//         method: 'POST',
//         body: readable
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log('Data echoed back from Postman Echo:', data);
//             // Since Postman Echo doesn't return a path, this is just for demo purposes
//             // setPath(data.path);
//         })
//         .catch((error) => {
//             console.error('Error uploading file:', error);
//         });
// }
// // server side

// function uploadImage(imageUrl: string) {
//     // Create a new FormData object
//     const formData = new FormData();

//     // Append the image data to the 'image' field
//     formData.append('file', imageUrl);
//     formData.append('expires', '2023-10-25T17:34:15.407Z');
//     formData.append('maxDownloads', '100');
//     formData.append('autoDelete', 'true'); // or 'false' based on your requirement

//     // Create a new XMLHttpRequest object
//     const xhr = new XMLHttpRequest();

//     // Configure it: POST-request for the URL https://file.io
//     xhr.open('POST', 'https://file.io', true);

//     // Set up a function to handle the progress event
//     xhr.upload.onprogress = function (event) {
//         if (event.lengthComputable) {
//             // Calculate the percentage of upload completed
//             const percentComplete = (event.loaded / event.total) * 100;
//             console.log(`Uploaded: ${percentComplete.toFixed(2)}%`);
//         }
//     };

//     // Set up a function to handle the load event
//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             const response = JSON.parse(xhr.responseText);
//             console.log('Upload complete:', response.link);
//         } else {
//             console.error('An error occurred:', xhr.statusText);
//         }
//     };

//     // Send the FormData object to the server
//     xhr.send(formData);
// }

// const handleFakeUpload = () => {
//     let currentPercentage = 0;

//     const interval = setInterval(() => {
//         currentPercentage += 10; // Increase by 10% every half second
//         setLoadPercentage(currentPercentage);

//         if (currentPercentage >= 100) {
//             clearInterval(interval);
//             // Do something after reaching 100%, like showing a success message
//             console.log('Upload completed!');
//         }
//         console.log(loadPercentage);
//     }, 500); // Update every half second
// };
