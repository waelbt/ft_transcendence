import { useEffect, useRef, useState } from 'react';
import Loader from '../../components/Animation';
import FormComponent from '../../components/FormComponent';
import './index.scss';
import progress, { FetchProgressData } from 'fetch-progress';

function Confirmation() {
    const [path, setPath] = useState('');
    const [isUploaded, setqIsUploaded] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<Number | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [loadPercentage, setLoadPercentage] = useState<number>(0);
    const inputRef2 = useRef<HTMLInputElement | null>(null);
    const inputRef1 = useRef<HTMLInputElement | null>(null);
    const AvatarRef = useRef<HTMLDivElement | null>(null);
    const onSubmit = async () => {
        console.log('define later');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setqIsUploaded(false);
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                console.log(reader.result);
                setPath(reader.result as string);
                setqIsUploaded(true);
                // setIsImageLoading(true); // Set loading to true when a new image is uploaded
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(path, { signal })
            .then(
                progress({
                    onProgress: (progressData: FetchProgressData) => {
                        const percentage =
                            (progressData.transferred / progressData.total) *
                            100;
                        console.log(`${loadPercentage.toFixed(2)}}%`);
                        setLoadPercentage(percentage);
                    }
                })
            )
            .then((response) => response.blob())
            .then((blob) => {
                setLoading(false);
                const objectURL = URL.createObjectURL(blob);
                if (AvatarRef && AvatarRef.current)
                    AvatarRef.current.style.background = `url(${objectURL}) 50% / cover no-repeat`;
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Fetch error:', error);
                }
            });

        return () => controller.abort(); // Abort fetch on component unmount
    }, [[path]]);
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
                        <div className="animation child">
                            <Loader
                                controller={
                                    isUploaded && selectedItemIndex == null
                                }
                            />
                        </div>
                        <div className="avatar child" ref={AvatarRef}>
                            <label
                                htmlFor="file-upload"
                                className={`uploader  ${
                                    isUploaded ? 'has-image' : ''
                                }`}
                            >
                                <input
                                    className="placeholder child"
                                    id="file-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                    ref={inputRef1}
                                />
                            </label>
                            {isUploaded ? (
                                <span
                                    className="reset-avatar"
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
    );
}

export default Confirmation;
