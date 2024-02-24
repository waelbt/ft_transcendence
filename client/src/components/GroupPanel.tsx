import { Fragment, useEffect, useState } from 'react';
import { HiLogout } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import { Avatar, Modal, ProgressRingLoader } from '.';
import useImageUpload from '../hooks/uploadImageHook';
import { MdEdit } from 'react-icons/md';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoTrashOutline } from 'react-icons/io5';
import { VISIBILTYOPTIONS } from '../constants';
import { useRoomStore } from '../stores/roomStore';
import { axiosPrivate } from '../api';
import { isAxiosError } from 'axios';
import { useChatLayoutStore } from '../stores/chatLayoutStore';
import { useUserStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';
import MembersList from './MembersList';
import AddMembers from './AddMembers';

function GroupPanel() {
    const {
        privacy,
        avatar,
        id,
        roomTitle,
        users,
        updateState,
        isModifiable,
        owner,
        isBanned
    } = useRoomStore();
    const [selectedVisibility, setSelectedVisibility] = useState(privacy);
    const [isEventOpen, setIsEventOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({});
    const { id: userID } = useUserStore();
    const { updateRoomInfo, socket, unpushRoom } = useChatLayoutStore();
    const visibilityOptions = watch('visibilityOption');
    const { setProgress, progress, uploadData, imagePath, setImagePath } =
        useImageUpload();
    const navigate = useNavigate();

    useEffect(() => {
        setImagePath(avatar);
        setValue('roomTitle', roomTitle, { shouldDirty: true });
        setValue('visibilityOption', privacy, { shouldDirty: true });
    }, [roomTitle, privacy, setValue, avatar]);

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
            data['avatar'] = imagePath ? imagePath : avatar;
            await axiosPrivate.post(
                '/chat/changeRoomInfo',
                JSON.stringify({
                    id: id,
                    newAvatar: data['avatar'],
                    newTitle: data['roomTitle'],
                    newPrivacy: data['visibilityOption'],
                    password: data['password']
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            updateState({ ...data });
            updateRoomInfo(+id, true, data);
            toast.success('group infos edited successfully');
            updateState({ isModifiable: false });
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
        }
    };

    const handleExit = () => {
        socket?.emit('leaveRoom', {
            id: id,
            roomTitle: roomTitle
        });
        unpushRoom(+id, true);
        navigate('/chat');
    };

    return (
        <>
            <div
                className="flex flex-col bg-white border-l border-stone-300 flex-grow items-start gap-4 justify-between px-5 py-10 relative "
                style={
                    isBanned(userID)
                        ? {
                              filter: 'blur(4px)',
                              pointerEvents: 'none'
                          }
                        : {}
                }
            >
                {owner[0] === userID &&
                    (!isModifiable ? (
                        <MdEdit
                            size={30}
                            className="cursor-pointer absolute right-5 top-5"
                            onClick={() => updateState({ isModifiable: true })}
                        />
                    ) : (
                        <ImCross
                            size={22}
                            className="cursor-pointer absolute right-5 top-5"
                            onClick={() => updateState({ isModifiable: false })}
                        />
                    ))}
                {!isModifiable ? (
                    <div className=" w-full flex flex-col items-center justify-center gap-4">
                        <div className="justify-center items-center gap-10 inline-flex ">
                            <div className="relative flex items-center justify-center">
                                <Avatar
                                    imageUrl={avatar}
                                    style="w-32 h-32 bg-black rounded-[150px]  flex-shrink-0"
                                />
                            </div>
                        </div>
                        <div className="flex  flex-col gap-4 justify-center items-center">
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-black text-2xl font-normal font-['Acme'] leading-snug tracking-tight">
                                    {roomTitle}
                                </div>
                            </div>

                            <div className="text-base font-normal font-['Acme']">
                                Group - {users.length} members
                            </div>
                        </div>
                    </div>
                ) : (
                    <form
                        className="px-4 pt-4 pb-4 w-full  flex-col justify-center  items-center gap-5  inline-flex relative"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className=" pr-3.5 py-px justify-center items-center gap-10 inline-flex">
                            <input
                                className="hidden"
                                id="groupsAvatar"
                                type="file"
                                onChange={async (event) => {
                                    const file = event.target.files?.[0];
                                    if (file) {
                                        const objectURL =
                                            URL.createObjectURL(file);
                                        setImagePath(objectURL);
                                        await uploadData(file);
                                        event.target.value = '';
                                    }
                                }}
                            />
                            {/* uploader section */}
                            <div className="relative flex items-center justify-center">
                                <Avatar
                                    imageUrl={imagePath}
                                    style="w-32 h-32"
                                />
                                <label htmlFor="groupsAvatar">
                                    <ProgressRingLoader
                                        style={
                                            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                        }
                                        radius={70}
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
                                        setProgress(0);
                                        // await deleteData();
                                    }}
                                >
                                    <div className="w-9 h-9 flex justify-center items-center">
                                        <IoTrashOutline
                                            className="text-white"
                                            size={20}
                                        />
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
                                    {...register('roomTitle', {
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
                                        key={'visiblty' + index}
                                    >
                                        <div className="flex items-center justify-center">
                                            <input
                                                id={`default-radio-${visibility}`}
                                                type="radio"
                                                {...register(
                                                    'visibilityOption',
                                                    {
                                                        required:
                                                            'A visibility option is required!'
                                                    }
                                                )}
                                                value={visibility}
                                                checked={
                                                    selectedVisibility ===
                                                    visibility
                                                }
                                                onChange={(e) =>
                                                    setSelectedVisibility(
                                                        e.target.value
                                                    )
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
                                            required: 'password is required!',
                                            minLength: {
                                                value: 5,
                                                message:
                                                    'password name must be at least 3 characters'
                                            }
                                        })}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            )}
                        </div>
                        <button className="px-2 py-2 bg-black rounded-md flex-col justify-center items-center gap-2.5 flex text-center text-white text-lg font-normal font-['Acme'] cursor-pointer hover:bg-stone-800">
                            save changes
                        </button>
                    </form>
                )}
                <MembersList />
                <div
                    className="flex gap-5 cursor-pointer text-red-700 text-lg font-semibold"
                    onClick={handleExit}
                >
                    <HiLogout size={33} />
                    <div>Exit Group</div>
                </div>
            </div>
        </>
    );
}
export default GroupPanel;
