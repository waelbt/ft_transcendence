import { useRef, useState } from 'react';
// import { request } from '../api';
import axios from 'axios';
import useAxiosPrivate from './axiosPrivateHook';

const useUpload = () => {
    const [isloading, setIsloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [avatarPath, setAvatarPath] = useState<string | null>(null);
    const axiosPrivate = useAxiosPrivate();
    const cancelTokenSource = useRef(axios.CancelToken.source());

    const deleteData = async () => {
        if (isloading) {
            cancelTokenSource.current.cancel('Upload cancelled by the user.');
            cancelTokenSource.current = axios.CancelToken.source();
        } else {
            setProgress(0);
        }
    };

    const uploadData = async (file: File) => {
        setIsloading(true);
        setError(null);
        setSuccess(false);

        // ! intercept this request
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
                    },
                    cancelToken: cancelTokenSource.current.token
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
            setIsloading(false);
        }
    };

    return {
        isloading,
        progress,
        error,
        success,
        uploadData,
        deleteData,
        avatarPath
    };
};

export default useUpload;
