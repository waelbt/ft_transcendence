import { Avatar, ProgressRingLoader } from '.';
import useImageUpload from '../hooks/uploadImageHook';
import { IoTrashOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { FieldValues, useForm } from 'react-hook-form';
import { FC, useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { isAxiosError } from 'axios';
import { VISIBILTYOPTIONS } from '../constants';
import { useChatLayoutStore } from '../stores/chatLayoutStore';

type GroupsFormProps = {
    closeEvent: () => void;
};

const GroupsForm: FC<GroupsFormProps> = ({ closeEvent }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({});
    const { pushRoom, socket } = useChatLayoutStore();
    const axiosPrivate = useAxiosPrivate();
    const { progress, uploadData, imagePath, setImagePath, deleteData } =
        useImageUpload();
    const [selectedVisibility, setSelectedVisibility] = useState('');

    const visibilityOptions = watch('visibilityOption');

    useEffect(() => {
        if (visibilityOptions && visibilityOptions.length === 0) {
            setValue('visibilityOption', [], { shouldValidate: true });
        }
    }, [visibilityOptions, setValue]);

    useEffect(() => {
        if (isSubmitting) {
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                const errorMessage = errors[firstErrorKey]?.message;
                if (typeof errorMessage === 'string') {
                    toast.dismiss();
                    toast.error(errorMessage);
                }
            }
        }
    }, [errors, isSubmitting]);

    const onSubmit = async (data: FieldValues) => {
        try {
            const res = await axiosPrivate.post(
                '/chat/createRoom',
                JSON.stringify({
                    avatar: imagePath
                        ? imagePath
                        : `${import.meta.env.VITE_DEFAULT_AVATAR}2.png`,
                    roomTitle: data['title'],
                    isConversation: false,
                    privacy: data['visibilityOption'],
                    password: data['password']
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(res.data);
            pushRoom(res.data);
            socket?.emit('joinRoom', {
                ...res.data,
                password: data['password']
            });
            toast.success('group created successfully');
            closeEvent();
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
        }
    };

    return (
        <form
            className="px-4 pt-4 pb-4  bg-white rounded-[20px] shadow border border-stone-300 flex-col justify-start items-center gap-5  inline-flex relative"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="text-black text-xl font-bold font-['Open Sans']">
                Customize your group
            </div>
            <div className="text-center text-zinc-600 text-[15px] font-normal font-['Open Sans']">
                give your new group a personality with a name and icon
            </div>
            <div className=" pr-3.5 py-px justify-center items-center gap-10 inline-flex">
                <input
                    className="hidden"
                    id="groupsAvatar"
                    type="file"
                    onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                            const objectURL = URL.createObjectURL(file);
                            setImagePath(objectURL);
                            await uploadData(file);
                            event.target.value = '';
                        }
                    }}
                />
                {/* uploader section */}
                <div className="relative flex items-center justify-center">
                    <Avatar imageUrl={imagePath} style="w-40 h-40" />
                    <label htmlFor="groupsAvatar">
                        <ProgressRingLoader
                            style={
                                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                            }
                            radius={88}
                            stroke={2}
                            progress={progress}
                        />
                    </label>
                    <span
                        className={`absolute bg-[#f9164f] p-0.3 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white border-solid flex justify-center items-center z-10 cursor-pointer ${
                            !imagePath ? 'hidden' : ''
                        }`}
                        onClick={async (e) => {
                            e.stopPropagation(); // This stops the event from reaching the label
                            setImagePath(null);
                            await deleteData();
                        }}
                    >
                        <div className="w-9 h-9 flex justify-center items-center">
                            <IoTrashOutline className="text-white" size={20} />
                        </div>
                    </span>
                </div>
            </div>
            <div className="w-[60%]">
                <div className="flex flex-col justify-start items-start gap-[7px] w-full">
                    <input
                        style={
                            isSubmitting
                                ? {
                                      opacity: '0.8',
                                      pointerEvents: 'none',
                                      color: 'grey'
                                  }
                                : {}
                        }
                        className={`w-full bg-white border-b-2 text-center border-gray-400 justify-start items-center gap-2.5 inline-flex  outline-none  text-black text-lg font-normal font-['Acme']`}
                        type="text"
                        placeholder="Choose name for your group"
                        {...register('title', {
                            required: 'group name is required!',
                            maxLength: {
                                value: 10,
                                message:
                                    'group name must be less than 10 characters'
                            },
                            minLength: {
                                value: 3,
                                message:
                                    'group name must be at least 3 characters'
                            }
                        })}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="flex  w-full items-center justify-between relative">
                <div className="flex flex-col w-full pl-5 items-start  justify-start">
                    {VISIBILTYOPTIONS.map((visibility, index) => (
                        <div
                            className="flex items-center mb-4 justify-between"
                            key={index}
                        >
                            <div className="flex items-center justify-center">
                                <input
                                    id={`default-radio-${visibility}`}
                                    type="radio"
                                    {...register('visibilityOption', {
                                        required:
                                            'A visibility option is required!'
                                    })}
                                    value={visibility}
                                    checked={selectedVisibility === visibility}
                                    onChange={(e) =>
                                        setSelectedVisibility(e.target.value)
                                    }
                                    className="w-4 h-4  bg-gray-100 border-gray-300 rounded focus:ring-blue focus:ring-1"
                                />
                                <label
                                    htmlFor={`default-radio-${visibility}`}
                                    className="ms-2 text-lg  font-['Acme'] font-medium text-zinc-600"
                                >
                                    {visibility.toLowerCase()}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedVisibility === 'PROTECTED' && (
                    <div className="absolute right-14 top-1/2 transition -translate-y-10">
                        <input
                            style={
                                isSubmitting
                                    ? {
                                          opacity: '0.8',
                                          pointerEvents: 'none',
                                          color: 'grey'
                                      }
                                    : {}
                            }
                            className={`w-full bg-white border-b-2 text-center border-gray-400 justify-start items-center gap-2.5 inline-flex  outline-none  text-black text-lg font-normal font-['Acme']`}
                            type="password"
                            placeholder="set password"
                            {...register('password', {
                                required: 'password is required!'
                            })}
                            disabled={isSubmitting}
                        />
                    </div>
                )}
            </div>
            <button className="px-5 py-3 bg-black rounded-md flex-col justify-center items-center gap-2.5 flex text-center text-white text-lg font-normal font-['Acme'] cursor-pointer hover:bg-stone-800">
                submit
            </button>
        </form>
    );
};

export default GroupsForm;
