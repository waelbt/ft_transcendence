import { useState } from 'react';
import {
    Avatar,
    ProgressRingLoader,
    InputField,
    FormComponent
} from '../../components/';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { type FieldValues } from 'react-hook-form';
import { DEFAULT_PATH } from '../../constants';
import useUpload from '../../hooks/UploadImageHook';

// ! combine the nickname and submit section into a resuable from
export function ProfileCompletion() {
    const [showDefault, setShowDefault] = useState<boolean>(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<Number>(-1);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const { progress, uploadData } = useUpload();
    // const { uploading, progress, error, success, uploadData } = useUpload();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        // mutate(data as LoginData);
    };

    const fields = [
        {
            label: 'Nickname',
            type: 'text',
            name: 'nickname',
            validation: {
                required: 'Nickname is required!',
                maxLength: {
                    value: 40,
                    message: 'Nickname must be less than 40 characters'
                },
                minLength: {
                    value: 5,
                    message: 'Nickname must be at least 5 characters'
                }
            }
        }
    ];
    return (
        <>
            <div className="flex flex-col h-screen shadow-2xl">
                {/* Content */}
                <div className="flex flex-col flex-grow shadow-custom z-0">
                    {/* Header */}
                    <div className="px-7 py-8 justify-start items-center gap-2.5 inline-flex">
                        <div className="text-black text-lg font-lemonada font-bold">
                            LaughTale
                        </div>
                    </div>
                    <div className="flex-grow w-full flex flex-col justify-center items-center gap-2.5">
                        <div className="px-3.5 py-px flex-col justify-start items-start gap-4 flex">
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
                            <div className="flex flex-col gap-4">
                                <span className="text-black text-lg font-bold font-sans">
                                    Add an avatar
                                </span>
                                <div className=" pr-3.5 py-px justify-start items-start gap-10 inline-flex">
                                    <input
                                        className="hidden"
                                        id="inputTag"
                                        type="file"
                                        onChange={(event) => {
                                            const file =
                                                event.target.files?.[0];
                                            if (file) {
                                                const objectURL =
                                                    URL.createObjectURL(file);
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
                                            style="p-14"
                                        />
                                        <label
                                            className="absolute top-0 left-0 w-full h-full"
                                            htmlFor="inputTag"
                                        >
                                            <ProgressRingLoader
                                                style={
                                                    'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                                }
                                                radius={62}
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
                                        <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                                            <div
                                                className="inline-flex justify-content items-center gap-1 "
                                                onClick={() =>
                                                    setShowDefault(!showDefault)
                                                }
                                            >
                                                {showDefault ? (
                                                    <IoIosArrowForward className="text-gray-500" />
                                                ) : (
                                                    <IoIosArrowDown className="text-gray-500" />
                                                )}

                                                <span className="text-neutral-400 text-base font-normal font-['Acme'] leading-snug tracking-tigh">
                                                    Or choose one of our
                                                    defaults
                                                </span>
                                            </div>
                                            <ul
                                                className={`list-none flex items-start gap-3 p-0  ${
                                                    showDefault ? 'hidden' : ''
                                                }`}
                                            >
                                                {Array.from(
                                                    { length: 6 },
                                                    (_, index) => (
                                                        <li
                                                            className={`w-11 h-11 flex-shrink-0 rounded-full p-[0.1rem]  border-solid border-primary-pink ${
                                                                index ===
                                                                selectedItemIndex
                                                                    ? 'border-2'
                                                                    : ''
                                                            }`}
                                                            key={index}
                                                            onClick={() => {
                                                                setImagePath(
                                                                    `${DEFAULT_PATH}${
                                                                        index +
                                                                        1
                                                                    }.png`
                                                                );
                                                                setSelectedItemIndex(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <img
                                                                className="w-full h-full object-cover rounded-full"
                                                                src={`${DEFAULT_PATH}${
                                                                    index + 1
                                                                }.png`}
                                                            />
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* nickname section */}
                            </div>
                            <FormComponent
                                fields={fields}
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
                </div>
                {/* Footer */}
                <div className="h-1/4 w-screen -z-1 bg-footer-image bg-cover bg-no-repeat"></div>
            </div>
        </>
    );
}
