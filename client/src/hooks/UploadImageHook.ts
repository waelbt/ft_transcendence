import { useState } from 'react';
import { request } from '../axios-utils';

const useUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const uploadData = async (url: string) => {
        setUploading(true);
        setError(null);

        try {
            var formData = new FormData();
            formData.append('file', url);
            await request.post('users/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function (progressEvent) {
                    if (progressEvent && progressEvent.total) {
                        let percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                        console.log(`Upload progress: ${percentCompleted}%`);
                    }
                }
            });
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to upload');
        } finally {
            setUploading(false);
        }
    };

    return { uploading, progress, error, success, uploadData };
};

export default useUpload;
