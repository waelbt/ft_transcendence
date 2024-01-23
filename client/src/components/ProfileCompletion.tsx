import { useEffect, useState } from 'react';
import { Avatar, ProgressRingLoader, FormComponent } from '../components/';
import { type FieldValues } from 'react-hook-form';
import { DEFAULT_PATH, NICKNAME_FIELD } from '../constants';
import useUpload from '../hooks/uploadImageHook';
import { useUserStore } from '../stores/userStore';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { IoTrashOutline } from 'react-icons/io5';

function ProfileCompletion() {
    const { updateState } = useUserStore();
    const [selectedItemIndex, setSelectedItemIndex] = useState<Number>(-1);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const axiosPrivate = useAxiosPrivate();
    const { progress, error, success, deleteData, uploadData, avatarPath } =
        useUpload();

    useEffect(() => {
        if (success) setImagePath(avatarPath);
    }, [success]);
    const handleSubmit = async (data: FieldValues) => {
        try {
            data['avatar'] = imagePath;
            await axiosPrivate.post('/users/info', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            updateState({ isProfileComplete: true });
            updateState({ verified: true });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="flex-grow w-full flex flex-col justify-center items-center gap-2.5 mb-10">
            <div className="px-3.5 py-px flex-col justify-start items-start gap-12 flex">
                {/* Header */}
                <div className=" flex-col justify-center items-start inline-flex gap-2">
                    <div className="text-neutral-900 text-3xl font-bold font-sans">
                        Welcome! Let’s create your profile
                    </div>
                    <div className="text-zinc-600 text-xl font-normal font-sans">
                        Let others get to know you better!
                    </div>
                </div>
                {/* avatar section */}
                <div className="flex flex-col justify-start items-start w-full gap-4">
                    <span className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                        Add an avatar
                    </span>
                    <div className=" pr-3.5 py-px justify-center items-center gap-10 inline-flex">
                        <input
                            className="hidden"
                            id="inputTag"
                            type="file"
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    const objectURL = URL.createObjectURL(file);
                                    setImagePath(objectURL);
                                    uploadData(file);
                                }
                            }}
                        />
                        {/* uploader section */}
                        <div className="relative flex items-center justify-center">
                            <Avatar
                                imageUrl={imagePath}
                                style="p-24 "
                                isloading={!!(progress && progress < 100)}
                            />
                            <label htmlFor="inputTag">
                                <ProgressRingLoader
                                    style={
                                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                    }
                                    radius={100}
                                    stroke={2}
                                    progress={progress}
                                />
                            </label>
                            <span
                                className={`absolute bg-[#f9164f] p-0.5 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white border-solid flex justify-center items-center z-10 cursor-pointer ${
                                    !imagePath ? 'hidden' : ''
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation(); // This stops the event from reaching the label
                                    setImagePath(null);
                                    selectedItemIndex == -1
                                        ? deleteData()
                                        : setSelectedItemIndex(-1);
                                }}
                            >
                                <div className="w-9 h-9 flex justify-center items-center">
                                    <IoTrashOutline
                                        className="text-white"
                                        size={22}
                                    />
                                </div>
                            </span>
                        </div>
                        {/* btn and default section */}
                        <div className="flex-col justify-center items-center gap-4 inline-flex">
                            {/* btn */}
                            <label
                                className="p-3 bg-white rounded-[55px] border border-stone-300 justify-center items-center gap-3 inline-flex cursor-pointer"
                                htmlFor="inputTag"
                            >
                                <div className="text-center text-neutral-500 text-xs font-normal font-['Acme']">
                                    Choose image
                                </div>
                            </label>
                            <div className="text-black text-base font-normal font-['Acme'] leading-snug tracking-tigh">
                                Or
                            </div>
                            {/* default */}
                            <div className="flex-col justify-center items-center gap-1 inline-flex">
                                <div className="inline-flex justify-content items-start gap-4 ">
                                    <span className="text-neutral-400 text-base font-normal font-['Acme'] leading-snug tracking-tigh">
                                        choose one of our defaults
                                    </span>
                                </div>
                                <ul className="list-none grid grid-cols-4 gap-3 p-0">
                                    {Array.from({ length: 4 }, (_, index) => (
                                        // ! use avatar component
                                        <li
                                            className={`w-10 h-10 flex-shrink-0 rounded-full border-solid border-primary-pink ${
                                                index === selectedItemIndex
                                                    ? 'border-2'
                                                    : ''
                                            }`}
                                            key={index}
                                            onClick={() => {
                                                setImagePath(
                                                    `${DEFAULT_PATH}${
                                                        index + 1
                                                    }.png`
                                                );
                                                setSelectedItemIndex(index);
                                            }}
                                        >
                                            <img
                                                className="w-full h-full object-cover rounded-full"
                                                src={`${DEFAULT_PATH}${
                                                    index + 1
                                                }.png`}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* nickname section */}
                </div>
                <FormComponent
                    fields={NICKNAME_FIELD}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default ProfileCompletion;
