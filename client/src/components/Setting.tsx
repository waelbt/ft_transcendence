import { useEffect, useState } from 'react';
import { Avatar, FormComponent, Twofa } from '.';
// import { NICKNAME_FIELD } from '../constants';

import { useNavigate, useOutletContext } from 'react-router-dom';
import { ProfileOutletContextType } from '../types/global';
import { useUserStore } from '../stores/userStore';
import useImageUpload from '../hooks/uploadImageHook';
// import { absoluteToast } from '../tools';
import useAxiosPrivate from '../hooks/axiosPrivateHook';

import toast from 'react-hot-toast';
import { FieldValues } from 'react-hook-form';

function Setting() {
    const { nickName, avatar, updateState } = useUserStore();
    const { isCurrentUser } = useOutletContext<ProfileOutletContextType>() ?? {
        isCurrentUser: false
    };
    const axiosPrivate = useAxiosPrivate();

    const [file, setFIle] = useState<File | undefined>();
    const navigate = useNavigate();
    const {
        // relativePath,
        uploadData,
        imagePath,
        setImagePath,
        // deleteData,
        success
    } = useImageUpload();

    useEffect(() => {
        if (!isCurrentUser) navigate(-1); // Go back to the Previouss page
    }, [isCurrentUser]);

    const updateNickname = async (data: FieldValues) => {
        try {
            // const oldAvatar = avatar;
            await axiosPrivate.post(`/users/UpdateNickName/${data.nickName}`);
            updateState({ nickName: data['nickName'] });
            toast.success('nickname updated successfully');
            // await delelte old path
        } catch (e) {
            toast.error('that name is already taken. try a different one');
        }
    };

    const updateAvatar = async () => {
        if (file) {
            try {
                const success = await uploadData(file);
                if (success) {
                    const res = await axiosPrivate.post(`/users/UpdateAvatar`, {
                        oldAvatar: avatar,
                        newAvatar: imagePath
                    });
                    // update end point put old and new path
                    if (imagePath) updateState({ avatar: imagePath });
                }
            } catch (e) {
                // console.log(e); // ! here
            }
        } else toast.error('no image selected');
    };

    return (
        <div className="h-full w-full gap-8 px-[60px] py-2.5 rounded-[20px]  justify-between items-center inline-flex ">
            <div className="self-stretch flex-col justify-between items-center inline-flex px-4 py-4 flex-grow">
                {/* {' '}
                gap-8 */}
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Appearance
                </div>
                <div className="h-full w-full flex-col inline-flex justify-center items-center gap-14">
                    {' '}
                    <div className="w-full flex-col items-start justify-center">
                        <div className="text-neutral-500 text-2xl font-normal font-['Acme']">
                            edit avatar
                        </div>
                        <div className="pt-5 pb-2.5 w-full justify-between items-center gap-[30px] inline-flex">
                            <Avatar
                                imageUrl={imagePath}
                                style="w-32 h-32 cursor-default"
                            />
                            <div className="flex-col justify-center items-start gap-4 inline-flex ">
                                <input
                                    className="hidden"
                                    id="inputImage"
                                    type="file"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        setFIle(file);
                                        if (file) {
                                            const objectURL =
                                                URL.createObjectURL(file);
                                            setImagePath(objectURL);
                                        }
                                    }}
                                />
                                <label
                                    className="p-3 bg-white rounded-[55px] border border-stone-300 justify-center items-center gap-3 inline-flex cursor-pointer"
                                    htmlFor="inputImage"
                                >
                                    <div className="text-center text-neutral-500 text-xs font-normal font-['Acme']">
                                        Choose image
                                    </div>
                                </label>

                                <div className="text-center text-zinc-400 text-sm font-normal font-['Poppins']">
                                    JPG or PNG. Max size of 4Mo
                                </div>
                                <div
                                    className="px-5 py-3 bg-stone-100 rounded-[32px] flex-col justify-center items-center gap-2.5 flex text-center text-neutral-500 text-sm font-normal font-['Acme'] cursor-pointer hover:bg-stone-200 "
                                    onClick={() => {
                                        updateAvatar();
                                    }}
                                >
                                    Upload Now
                                </div>
                            </div>
                        </div>
                    </div>
                    <FormComponent
                        fields={[
                            {
                                label: '',
                                type: 'text',
                                name: 'nickName',
                                placeholder: nickName,
                                validation: {
                                    required: 'Nickname is required!',
                                    maxLength: {
                                        value: 15,
                                        message:
                                            'Nickname must be less than 15 characters'
                                    },
                                    minLength: {
                                        value: 5,
                                        message:
                                            'Nickname must be at least 5 characters'
                                    }
                                }
                            }
                        ]}
                        onSubmit={updateNickname}
                    />
                </div>
            </div>
            <div className="w-px h-[90%] relative bg-neutral-300" />{' '}
            <div className="self-stretch flex-col justify-between items-center inline-flex gap-8 px-4 py-4 flex-grow">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Security
                </div>
                <div className="h-full w-full flex-col inline-flex justify-center items-center gap-4">
                    {' '}
                    <div className="flex-col justify-center items-start gap-2.5 flex">
                        <div className="text-center text-black text-base font-normal font-['Poppins']">
                            Two-Factor Authentication
                        </div>
                        <div className="w-[440px] text-neutral-400 text-sm font-light font-['Poppins']">
                            Download the Google Authenticator app from the app
                            store and scan the QR code below
                        </div>
                    </div>
                    <Twofa />
                </div>
            </div>
        </div>
    );
}

export default Setting;
