import { useState } from 'react';
import AvatarUploader from '../../components/AvatarUploader';
import InputField from '../../components/InputField';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { IconContext } from 'react-icons';

// ! combine the nickname and submit section into a resuable from
export function ProfileCompletion() {
    const [show, setShow] = useState<boolean>(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<Number | null>(
        null
    );
    const [upload, setUpload] = useState(false);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setImagePath(objectURL);
            setUpload(true);
        }
    };
    const reset = () => {
        setUpload(false);
        setImagePath(null);
    };
    return (
        <>
            <IconContext.Provider
                value={{
                    color: '#A0A0A0'
                }}
            >
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
                                        {/* uploader section */}
                                        <div className="flex flex-col items-start gap-4">
                                            <AvatarUploader
                                                imageUrl={imagePath}
                                                upload={upload}
                                                onchange={handleFileChange}
                                                reset={reset}
                                            />
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
                                                    <input
                                                        className="hidden"
                                                        id="inputTag"
                                                        type="file"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                    />
                                                </div>
                                            </label>
                                            {/* default */}
                                            <div className="flex-col justify-start items-start gap-0 inline-flex">
                                                <div
                                                    className="inline-flex justify-content items-center gap-1 "
                                                    onClick={() =>
                                                        setShow(!show)
                                                    }
                                                >
                                                    {show ? (
                                                        <IoIosArrowForward />
                                                    ) : (
                                                        <IoIosArrowDown />
                                                    )}

                                                    <span className="text-neutral-400 text-base font-normal font-['Acme'] leading-snug tracking-tigh">
                                                        Or choose one of our
                                                        defaults
                                                    </span>
                                                </div>
                                                <ul
                                                    className={`list-none flex items-start gap-3 p-0  ${
                                                        show ? 'hidden' : ''
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
                                                                    // setUpload(false);
                                                                    setImagePath(
                                                                        `./src/assets/images/default${
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
                                                                    src={`./src/assets/images/default${
                                                                        index +
                                                                        1
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
                                <InputField label="Nickname" />
                                {/* submit putton section */}
                                <div className="w-full flex-col justify-end items-end gap-3 inline-flex">
                                    <button className="bg-black rounded-[55px] justify-center items-center gap-3 inline-flex hover:bg-gray-500">
                                        <div className="py-3.5 px-5 text-center text-white text-sm font-bold font-sans">
                                            Continue
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="h-1/4 w-screen -z-1 bg-footer-image bg-cover bg-no-repeat"></div>
                </div>
            </IconContext.Provider>
        </>
    );
}
