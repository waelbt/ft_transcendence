import { useRef, useState } from 'react';
import AvatarOptionsContext from './AvatarOptionsContext';
import FormComponent from '../../Components/FormComponent';
import './index.scss';

function Confirmation() {
    const [path, setPath] = useState('');
    const inputRef2 = useRef<HTMLInputElement | null>(null);
    const inputRef1 = useRef<HTMLInputElement | null>(null);
    const onSubmit = async () => {
        console.log('define later');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setPath(fileURL);
        }
    };

    const fields = [
        {
            label: 'Nickname',
            type: 'text',
            placeholder: 'dos404',
            name: 'Nickname'
            // validition check
        }
    ];

    return (
        <AvatarOptionsContext.Provider value={{ path, setPath }}>
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
                                    className="uploader"
                                >
                                    {path ? (
                                        <img
                                            src={path}
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

                            {/* Choose image */}
                            <div className="avatar-select">
                                <span className="text">
                                    Or choose one of our defaults
                                </span>
                                <ul className="list">
                                    <li className="item"></li>
                                    <li className="item"></li>
                                    <li className="item"></li>
                                    <li className="item"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <FormComponent
                        fields={fields}
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
        </AvatarOptionsContext.Provider>
    );
}

export default Confirmation;
