import toast from 'react-hot-toast';

export const absoluteToast = (
    callback: (message: string) => string,
    message: string
) => {
    toast.dismiss();
    if (callback && typeof callback === 'function') {
        callback(message);
    } else {
        toast(message);
    }
};
