import { useState } from 'react';
import { Avatar, ProgressRingLoader, FormComponent } from '../components/';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { type FieldValues } from 'react-hook-form';
import { DEFAULT_PATH, NICKNAME_FIELD } from '../constants';
import useUpload from '../hooks/UploadImageHook';
import { request } from '../api';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

function ProfileCompletion() {
    const navigate = useNavigate();
    const { updateState } = useUserStore();
    const [showDefault, setShowDefault] = useState<boolean>(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<Number>(-1);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const { progress, uploadData } = useUpload();
    // const { uploading, progress, error, success, uploadData } = useUpload();

    const onSubmit = async (data: FieldValues) => {
        data['avatar'] = imagePath
            ? imagePath
            : '/home/wael/Desktop/ft_transcendence/client/src/assets/images/image_processing20221027-11907-zvqv42.png';
        try {
            console.log(data);
            await request.post('/users/info', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            updateState({ isProfileComplete: true });
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="flex-grow w-full flex flex-col justify-center items-center gap-2.5">
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
                <div className="flex flex-col gap-4 justify-start items-start">
                    <span className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                        Add an avatar
                    </span>
                    <div className=" pr-3.5 py-px justify-start items-start gap-10 inline-flex">
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
                        <div className="relative">
                            <Avatar
                                imageUrl={imagePath}
                                onCLick={(event) => {
                                    event.stopPropagation(); // This stops the event from reaching the label
                                    setImagePath(null);
                                    setSelectedItemIndex(-1);
                                }}
                                style="p-20"
                            />
                            <label
                                className="absolute top-0 left-0 w-full h-full"
                                htmlFor="inputTag"
                            >
                                <ProgressRingLoader
                                    style={
                                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                    }
                                    radius={84}
                                    stroke={2}
                                    progress={progress}
                                />
                            </label>
                        </div>
                        {/* btn and default section */}
                        <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                            {/* btn */}
                            <label
                                className="p-3 bg-white rounded-[55px] border border-stone-300 justify-center items-center gap-3 inline-flex cursor-pointer"
                                htmlFor="inputTag"
                            >
                                <div className="text-center text-neutral-500 text-xs font-normal font-['Acme']">
                                    Choose image
                                </div>
                            </label>
                            {/* default */}
                            <div className="flex-col justify-center items-center gap-0.5 inline-flex">
                                <div
                                    className="inline-flex justify-content items-center gap-1 "
                                    onClick={() => setShowDefault(!showDefault)}
                                >
                                    {!showDefault ? (
                                        <IoIosArrowForward className="text-gray-500" />
                                    ) : (
                                        <IoIosArrowDown className="text-gray-500" />
                                    )}

                                    <span className="text-neutral-400 text-base font-normal font-['Acme'] leading-snug tracking-tigh">
                                        Or choose one of our defaults
                                    </span>
                                </div>
                                <ul
                                    className={`list-none grid grid-cols-3 gap-3 p-0 ${
                                        !showDefault ? 'hidden' : ''
                                    }`}
                                >
                                    {Array.from({ length: 6 }, (_, index) => (
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
                    onSubmit={onSubmit}
                    btn={{
                        // TODO: store this in a custom style proprty
                        style: 'bg-black rounded-[55px] justify-center items-center gap-3 inline-flex hover:bg-gray-500 py-3.5 px-5 text-center text-white text-sm font-bold font-sans',
                        type: 'submit',
                        text: 'Continue'
                    }}
                />
            </div>
        </div>
    );
}

export default ProfileCompletion;
