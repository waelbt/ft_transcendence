// import { useState } from 'react';
// import axios from 'axios';

// const useUpload = (url : string) => {
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const uploadData = async (data) => {
//     setUploading(true);
//     setError(null);

//     try {
//       await axios.post(url, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           // Update the upload progress
//           setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
//         },
//       });
//       setSuccess(true);
//     } catch (err) {
//       setError(err.message || 'Failed to upload');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return { uploading, progress, error, success, uploadData };
// };

// export default useUpload;