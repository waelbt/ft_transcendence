import { MdClose } from 'react-icons/md';
import { useModelStore } from '../stores/ModelStore';
import { Avatar, FormComponent, InputField, ProgressRingLoader } from '.';
// import { useUserStore } from '../stores/userStore';
// import useAxiosPrivate from '../hooks/axiosPrivateHook';
import useImageUpload from '../hooks/uploadImageHook';
import { IoTrashOutline } from 'react-icons/io5';
import { GROUP_NAME_FIELD, VISIBILTYOPTIONS } from '../constants';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { FieldValues } from 'react-hook-form';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useState } from 'react';

function CreateGroup() {
    const { closeEvent } = useModelStore();
    // const { updateState, logout } = useUserStore();
    const axiosPrivate = useAxiosPrivate();
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

    const handleSubmit = async (data: FieldValues) => {
        try {
            await axiosPrivate.post(
                '/chat/createRoom',
                JSON.stringify({
                    roomTitle: data['title'],
                    isConversation: false,
                    privacy: 'PUBLIC',
                    password: ''
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Profile created successfully');
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className="px-4 pt-4 pb-4 bg-white rounded-[20px] shadow border border-stone-300 flex-col justify-start items-center gap-[15px] inline-flex relative">
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
                    <Avatar
                        imageUrl={imagePath}
                        style="w-40 h-40"
                        // isloading={!!(progress && progress < 100)}
                        // errror={isFailed}
                    />
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
            <div className="w-[70%]">
                <FormComponent
                    fields={GROUP_NAME_FIELD}
                    onSubmit={handleSubmit}
                />
            </div>
            <div className="flex gap-5">
                {VISIBILTYOPTIONS.map((visibility, index) => (
                    <div className="flex items-center mb-4" key={index}>
                        <input
                            id={`default-checkbox-${visibility}`}
                            type="checkbox"
                            checked={selectedVisibility === visibility}
                            onChange={() => setSelectedVisibility(visibility)}
                            className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
                        />
                        <label
                            htmlFor={`default-checkbox-${visibility}`}
                            className="ms-2 text-lg font-['Acme'] font-medium text-zinc-600"
                        >
                            {visibility}
                        </label>
                    </div>
                ))}
            </div>
            {selectedVisibility === 'protected' && (
                <InputField
                    key={idx}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    register={register(field.name, field.validation)}
                    secure={field.secure}
                />
                // <input className="border boreder-black" />
            )}
            <button className="border border-gray-400 text-slate-700 text-lg font-['Acme'] p-2 px-4">
                Create group
            </button>
        </div>
    );
}

export default CreateGroup;
