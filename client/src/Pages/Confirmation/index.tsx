import { useEffect, useRef, useState } from 'react';
// import AvatarOptionsContext from './AvatarOptionsContext';
import FormComponent from '../../Components/FormComponent';
import './index.scss';

function Confirmation() {
    const [path, setPath] = useState('');
    const [isUploaded, setqIsUploaded] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<Number | null>(
        null    
    );
    const [isImageLoading, setIsImageLoading] = useState(!!path);
    const inputRef2 = useRef<HTMLInputElement | null>(null);
    const inputRef1 = useRef<HTMLInputElement | null>(null);
    const onSubmit = async () => {
        console.log('define later');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPath(reader.result as string);
                setqIsUploaded(true);
                setIsImageLoading(true);  // Set loading to true when a new image is uploaded
            };
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if (isImageLoading) {
            console.log("loaded");
            // Your logic to update the Loader progress based on image loading, if needed
        }
    }, [isImageLoading]);

    const avatarData = [
        {
            src: 'https://cdn.intra.42.fr/users/b8020f118bb6ae2ddbe38dee79a28de6/messaada.jpeg'
        },
        {
            src: 'https://cdn.intra.42.fr/users/16f57cd33893f2096bae128c18a051c1/lchokri.jpg'
        },
        {
            src: 'https://cdn.intra.42.fr/users/65d4ab347afbc68c28f17ad22405d2e8/ibouchaf.JPG'
        },
        {
            src: 'https://cdn.intra.42.fr/users/3fe187b98b948c31ae17b534ea656927/omanar.jpg'
        }
    ];

    return (
        // <AvatarOptionsContext.Provider value={{ path, setPath }}>
        <div className="card">
            <div className="header">
                <div className="text">One step ahead</div>
            </div>
            <div className="card-container">
                <div className="header">Choose a profile picture</div>
                <div className="avatar-container">
                    <div className="section1">
                        <div className="avatar">
                            <label
                                htmlFor="file-upload"
                                className={`uploader ${
                                    isUploaded ? 'has-image' : ''
                                }`}
                            >
                                {path ? (
                                    <img
                                        src={path}
                                        loading="lazy"
                                        alt="Avatar"
                                        className="image"
                                    />
                                ) : (
                                    <input
                                        className="placeholder"
                                        id="file-upload"
                                        type="file"
                                        onChange={handleFileChange}
                                        ref={inputRef1}
                                    />
                                )}
                            </label>
                            {isUploaded ? (
                                <span
                                    className="cancel-avatar"
                                    onClick={() => {
                                        setSelectedItemIndex(null);
                                        setqIsUploaded(false);
                                        setPath('');
                                    }}
                                >
                                    <a className="trash-icon"></a>
                                </span>
                            ) : null}
                        </div>
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
                                ref={inputRef2}
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
                                            setPath(avatar.src);
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
        // </AvatarOptionsContext.Provider>
    );
}

export default Confirmation;


