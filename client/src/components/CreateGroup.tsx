import { MdClose } from 'react-icons/md';
import { useModelStore } from '../stores/ModelStore';
import { Avatar, InputField, ProgressRingLoader } from '.';
import useImageUpload from '../hooks/uploadImageHook';
import { IoTrashOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
// import { useUserStore } from '../stores/userStore';
// import useAxiosPrivate from '../hooks/axiosPrivateHook';
// import { isAxiosError } from 'axios';
import { VISIBILTYOPTIONS } from '../constants';
import useAxiosPrivate from '../hooks/axiosPrivateHook';

function CreateGroup() {
    const { closeEvent } = useModelStore();
    const {
        register,
        handleSubmit,
        setValue,
        // getValues,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({});

    // const axiosPrivate = useAxiosPrivate();
    const {
        progress,
        uploadData,
        imagePath,
        setImagePath,
        deleteData
        // isFailed,
        // success,
        // setProgress
    } = useImageUpload();
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
                    toast.error(errorMessage);
                }
            }
        }
    }, [errors, isSubmitting]);

    const onSubmit = async (data: FieldValues) => {
        console.log('www', data);
        //     try {
        //         await axiosPrivate.post(
        //             '/chat/createRoom',
        //             JSON.stringify({
        //                 roomTitle: data['title'],
        //                 isConversation: false,
        //                 privacy: 'PUBLIC',
        //                 password: ''
        //             }),
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 }
        //             }
        //         );
        //         toast.success('Profile created successfully');
        //     } catch (error) {
        //         if (isAxiosError(error)) toast.error(error.response?.data?.message);
        //     }
    };
    return (
        <form
            className="px-4 pt-4 pb-4 bg-white rounded-[20px] shadow border border-stone-300 flex-col justify-start items-center gap-[15px] inline-flex relative"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
                className="w-full cursor-pointer	"
                onClick={() => {
                    closeEvent();
                }}
            >
                <MdClose size={22} />
            </div>
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
                <InputField
                    label=""
                    type="text"
                    placeholder="Choose name for your group"
                    register={register('title', {
                        required: 'group name is required!',
                        maxLength: {
                            value: 10,
                            message:
                                'group name must be less than 10 characters'
                        },
                        minLength: {
                            value: 3,
                            message: 'group name must be at least 3 characters'
                        }
                    })}
                    disabled={isSubmitting}
                />
            </div>
            <div className="w-full px-10 ">
                <Popup
                    trigger={
                        <div className="relative p-2.5 bg-neutral-100 rounded-[50px] justify-start items-center gap-2.5 inline-flex">
                            test
                        </div>
                    }
                    position="bottom center"
                    nested
                >
                    <div className="p-2.5 w-max pb-0.5 bg-white rounded-[5px] shadow flex-col justify-start items-center inline-flex">
                        {VISIBILTYOPTIONS.map((visibility, index) => (
                            <div
                                key={index}
                                className="w-[89px] px-[15px] py-2.5 border-b border-black border-opacity-20 justify-center items-center gap-2.5 inline-flex"
                            >
                                <div className="text-zinc-600 text-lg font-normal font-['Acme']">
                                    {visibility.toLowerCase()}
                                </div>
                            </div>
                        ))}
                    </div>
                </Popup>
            </div>
            {/* <div className="flex gap-5">
                {VISIBILTYOPTIONS.map((visibility, index) => (
                    <div className="flex items-center mb-4" key={index}>
                        <input
                            id={`default-radio-${visibility}`}
                            type="radio"
                            {...register('visibilityOption', {
                                required: 'A visibility option is required!'
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
                            className="ms-2 text-lg font-['Acme'] font-medium text-zinc-600"
                        >
                            {visibility}
                        </label>
                    </div>
                ))}
            </div> */}
            {selectedVisibility === 'protected' && (
                <div className="w-[60%]">
                    <InputField
                        label=""
                        type="password"
                        placeholder="password"
                        register={register('password', {
                            required: 'password is required!',
                            maxLength: {
                                value: 10,
                                message:
                                    'password name must be less than 10 characters'
                            },
                            minLength: {
                                value: 3,
                                message:
                                    'password name must be at least 3 characters'
                            }
                        })}
                        disabled={isSubmitting}
                    />
                </div>
            )}
        </form>
    );
}

export default CreateGroup;
