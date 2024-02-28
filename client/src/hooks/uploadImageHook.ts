import { useRef, useState } from 'react';
// import { request } from '../api';
import axios from 'axios';
import useAxiosPrivate from './axiosPrivateHook';
import toast from 'react-hot-toast';

const useImageUpload = () => {
    const [isloading, setIsloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFailed, setIsFailed] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const axiosPrivate = useAxiosPrivate();
    const cancelTokenSource = useRef(axios.CancelToken.source());

    const deleteData = async () => {
        if (isloading) {
            cancelTokenSource.current.cancel('Upload cancelled by the user.');
            cancelTokenSource.current = axios.CancelToken.source();
        } else {
            try {
                await axiosPrivate.delete(`/users/delete`, {
                    data: {
                        path: imagePath
                    }
                });
            } catch (e) {
                if (isAxiosError(e))
                toast.error(e.response?.data?.message);  
            }
            setProgress(0);
        }
        setSuccess(false);
    };

    const uploadData = async (file: File) => {
        setIsloading(true);
        setIsFailed(false);
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
                        }
                    },
                    cancelToken: cancelTokenSource.current.token
                }
            );
            setImagePath(response.data);
            setSuccess(true);
            setIsloading(false);
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(
                    err.response?.data.message ||
                        'Failed to upload avatar, try again'
                );
            }
            setIsFailed(true);
            setIsloading(false);
            setImagePath(null);
            setProgress(0);
            return false;
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
        setImagePath,
        setProgress
    };
};

export default useImageUpload;
