import { useRef, useState } from 'react';
// import { request } from '../api';
import axios from 'axios';
import useAxiosPrivate from './axiosPrivateHook';
import { absoluteToast } from '../tools';
import toast from 'react-hot-toast';

const useImageUpload = () => {
    const [isloading, setIsloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFailed, setIsFailed] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const axiosPrivate = useAxiosPrivate();
    const cancelTokenSource = useRef(axios.CancelToken.source());

    const deleteData = async (path: string) => {
        if (isloading) {
            cancelTokenSource.current.cancel('Upload cancelled by the user.');
            cancelTokenSource.current = axios.CancelToken.source();
        } else {
            // axiosPrivate
            //     .delete(`/users/delete/image/${path}`)
            //     .then((response) => {
            //         console.log('Response:', response.data);
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //     });
            setProgress(0);
        }
    };

    const uploadData = async (file: File) => {
        setIsloading(true);
        setIsFailed(false);
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
            setImagePath(response.data);
            setSuccess(true);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                absoluteToast(
                    toast.error,
                    err.response?.data.message ||
                        'Failed to upload avatar, try again'
                );
            }
            setIsFailed(true);

            setImagePath(null);
            setProgress(0);
        } finally {
            setIsloading(false);
        }
    };

    return {
        isloading,
        progress,
        isFailed,
        success,
        uploadData,
        deleteData,
        imagePath,
        setImagePath
    };
};

export default useImageUpload;
