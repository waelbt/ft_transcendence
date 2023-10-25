import { useState } from 'react';
import FormComponent from '../../components/FormComponent';
import AvatarUploader from '../../components/AvatarUploader';
import './index.scss';

function Confirmation() {
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [_, setqIsUploaded] = useState(false);
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
        }
    };

    const reset = () => {
        setqIsUploaded(false);
        setImagePath(null);
    };
    const avatarData = [
        {
            src: '../public/background_image.svg'
        },
        {
            src: '../public/background_image.svg'
        },
        {
            src: '../public/background_image.svg'
        },
        {
            src: '../public/background_image.svg'
        }
    ];

    return (
        <div className="card">
            <div className="header">
                <div className="text">One step ahead</div>
            </div>
            <div className="card-container">
                <div className="header">Choose a profile picture</div>
                <div className="avatar-container">
                    <div className="section1">
                        <AvatarUploader
                            imageUrl={imagePath}
                            onchange={handleFileChange}
                            reset={reset}
                        />
                        <span className="text">
                            Max size: 4MB
                            <br />
                            Supported format: PNG, JPG
                        </span>
                    </div>
                    <div className="section2">
                        <label
                            htmlFor="inputTag"
                            className="avatar-uploader-btn"
                        >
                            Choose image
                            <input
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
                                            setqIsUploaded(true);
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
                />
                <button className="skip-button" type="submit">
                    Skip
                </button>
            </div>
        </div>
    );
}

export default Confirmation;
