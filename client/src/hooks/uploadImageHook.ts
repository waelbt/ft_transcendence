import { useState } from 'react';
// import { request } from '../api';
import axios from 'axios';
import useAxiosPrivate from './axiosPrivateHook';

const useUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [avatarPath, setAvatarPath] = useState<string | null>(null);
    const axiosPrivate = useAxiosPrivate();

    const uploadData = async (file: File) => {
        setUploading(true);
        setError(null);
        setSuccess(false);

        try {
            var formData = new FormData();
            formData.append('file', file);

            const response = await axiosPrivate.post(
                '/users/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent && progressEvent.total) {
                            let percentCompleted = Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            );
                            setProgress(percentCompleted);
                            console.log(
                                `Upload progress: ${percentCompleted}%`
                            );
                        }
                    }
                }
            );
            setAvatarPath(response.data);
            setSuccess(true);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message || 'Failed to upload');
            } else {
                setError('An unexpected error occurred');
            }
            console.log(error);
            setProgress(0);
        } finally {
            setUploading(false);
        }
    };

    return { uploading, progress, error, success, uploadData, avatarPath };
};

export default useUpload;
