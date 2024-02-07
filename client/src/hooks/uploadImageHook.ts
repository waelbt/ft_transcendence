import { useRef, useState } from 'react';
// import { request } from '../api';
import axios from 'axios';
import useAxiosPrivate from './axiosPrivateHook';
import toast from 'react-hot-toast';

const useImageUpload = () => {
    const [isloading, setIsloading] = useState(false);
    const [relativePath, setRelativePath] = useState('');
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
                const res = await axiosPrivate.delete(
                    `/users/delete/${encodeURIComponent(imagePath as string)}`
                );
            } catch (e) {
                console.log(e);
            }
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
                        }
                    },
                    cancelToken: cancelTokenSource.current.token
                }
            );
            // setRelativePath(response.data);
            setImagePath(response.data);
            // console.log(response.data);
            setSuccess(true);
            setIsloading(false);

            return true;
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
        relativePath,
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
