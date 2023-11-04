import { useState } from 'react';
import FormComponent from '../../components/FormComponent';
import AvatarUploader from '../../components/AvatarUploader';

export function ProfileCompletion() {
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [upload, setUpload] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<Number | null>(
        null
    );

    const onSubmit = async () => {
        console.log('define later');
    };

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

    // const avatarData = [
    //     {
    //         src: '../public/background_image.svg'
    //     },
    //     {
    //         src: '../public/background_image.svg'
    //     },
    //     {
    //         src: '../public/background_image.svg'
    //     },
    //     {
    //         src: '../public/background_image.svg'
    //     }
    // ];

    return (
        <div className="inline-flex flex-col items-center gap-9">
            <div className="text-center text-yellow text-6xl font-BombSound">
                One step ahead
            </div>

            <div className="flex p-9 flex-col items-center gap-4 rounded-3xl bg-blue-opacity-80 shadow-custom">
                <div
                    className="text-white text-center font-Acme text-3xl font-normal"
                    style={{ letterSpacing: '0.0675rem' }}
                >
                    Choose a profile picture
                </div>
                <div className="flex w-96 items-center gap-9">
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
                    {/* <div>

                    </div> */}
                </div>
                {/* <AvatarUploader
                    imageUrl={imagePath}
                    upload={upload}
                    onchange={handleFileChange}
                    reset={reset}
                /> */}
            </div>
            {/*
                
                <div className="flex w-[84%] items-center gap-8 text-white">
                    <div className="relative flex flex-col gap-4">
                        <AvatarUploader
                            imageUrl={imagePath}
                            upload={upload}
                            onchange={handleFileChange}
                            reset={reset}
                        />
                        <span className="font-Acme text-sm font-normal tracking-tighter">
                            Max size: 4MB
                            <br />
                            Supported format: PNG, JPG
                        </span>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label
                            htmlFor="inputTag"
                            className="flex p-2.25 justify-center items-center gap-2.5 rounded-full bg-white text-primary-text-color text-center text-xs font-normal"
                        >
                            Choose image
                            <input
                                className="hidden"
                                id="inputTag"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </label>
                        <div className="avatar-select">
                            <span className="text">
                                Or choose one of our defaults
                            </span>
                            <ul className="list">
                                {avatarData.map((avatar, index) => (
                                    <li
                                        className={`item${
                                            index === selectedItemIndex
                                                ? ' selected'
                                                : ''
                                        }`}
                                        key={index}
                                        onClick={() => {
                                            setUpload(false);
                                            setImagePath(avatar.src);
                                            setSelectedItemIndex(index);
                                        }}
                                    >
                                        <span className="default-avatar">
                                            <img src={avatar.src} />
                                        </span>
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
                        style: 'confirm-button',
                        type: 'submit',
                        text: 'Confim'
                    }}
                /> */}

            {/* flex mt-2 ml-auto mr-auto py-1.5 px-28 justify-center items-center space-x-2.5 border-0 rounded-full bg-PrimaryBlue text-white text-center font-BombSound text-2xl font-normal leading-normal ${btn.style} hover:bg-pink */}
            {/* <button className="skip-button" type="submit">
                    Skip
                </button> */}
        </div>
    );
}
