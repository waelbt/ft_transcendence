import { useState } from 'react';
import FormComponent from '../../components/FormComponent';
import AvatarUploader from '../../components/AvatarUploader';

// ! fix later when the project ends
export function ProfileCompletion() {
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [upload, setUpload] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<Number | null>(
        null
    );

    // ! define this
    const onSubmit = async () => {};

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

    const avatarData = [
        // ! add default avatar + add them into the tailwind config js
        {
            src:'./src/assets/defaultPicture3.jpg'
        },
        {
            src:'./src/assets/defaultPicture3.jpg'
        },
        {
            src:'./src/assets/defaultPicture3.jpg'
        }
    ];

    return (
        <>
            <div className="fixed top-0 left-0 w-full  h-screen overflow-hidden bg-primary bg-cover bg-no-repeat blur-sm -z-10"></div>
            <div className="flex w-full h-screen justify-center items-center">
                <div className="inline-flex flex-col items-center gap-9">
                    <div className="text-center text-yellow text-6xl font-BombSound">
                        One step ahead
                    </div>

                    <div className="flex p-9 flex-col items-center gap-4 rounded-3xl bg-blue-opacity-70 shadow-custom">
                        <div
                            className="text-white text-center font-Acme text-3xl font-normal"
                            style={{ letterSpacing: '0.0675rem' }}
                        >
                            Choose a profile picture
                        </div>
                        <div className="flex w-96 items-center gap-7">
                            <div className="flex flex-col items-start gap-4">
                                <AvatarUploader
                                    imageUrl={imagePath}
                                    upload={upload}
                                    onchange={handleFileChange}
                                    reset={reset}
                                />
                                <span className="text-white font-Acme text-sm font-normal tracking-tighter">
                                    Max size :&ensp;4MB
                                    <br />
                                    Supported format :&ensp;PNG, JPG
                                </span>
                            </div>
                            <div className="flex flex-col items-start gap-3">
                                <label
                                    htmlFor="inputTag"
                                    className="flex p-3 justify-center items-center gap-2.5 rounded-full bg-white text-primary-blue text-center font-Acme text-base font-normal hover:border-2 border-primary-blue"
                                >
                                    Choose image
                                    <input
                                        className="hidden"
                                        id="inputTag"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <div className="flex flex-col items-start">
                                    <span className="text-white font-Acme text-base font-normal leading-7 tracking-wide">
                                        Or choose one of our defaults
                                    </span>
                                    <ul className="list-none flex items-start gap-3 p-0">
                                        {avatarData.map((avatar, index) => (
                                            <li
                                                className={`w-11 h-11 flex-shrink-0 rounded-full p-[0.1rem] ${
                                                    index === selectedItemIndex
                                                        ? 'border-2 border-solid border-white'
                                                        : ''
                                                }`}
                                                key={index}
                                                onClick={() => {
                                                    setUpload(false);
                                                    setImagePath(avatar.src);
                                                    setSelectedItemIndex(index);
                                                }}
                                            >
                                                <img
                                                    className="w-full h-full object-cover rounded-full"
                                                    src={avatar.src}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <FormComponent
                            fields={[
                                {
                                    label: 'Nickname',
                                    type: 'text',
                                    placeholder: 'dos404',
                                    name: 'Nickname'
                                }
                            ]}
                            onSubmit={onSubmit}
                            btn={{
                                style: 'flex mt-2 ml-auto mr-auto py-2.5 px-32 justify-center items-center \
                    space-x-2.5 rounded-full  bg-pink hover:bg-dark-pink bg-none text-white \
                    text-center font-BombSound text-2xl\
                    font-normal leading-normal',
                                type: 'submit',
                                text: 'Confim'
                            }}
                        />
                        <button
                            className="
                    flex mt-2 ml-auto mr-auto py-2 px-[135px] justify-center items-center space-x-2.5 rounded-full
                    bg-none text-white border-dashed border-white text-center font-BombSound text-2xl
                    font-normal leading-normal hover:border-2 active:border-solid active:bg-white active:text-pink"
                            type="submit"
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
