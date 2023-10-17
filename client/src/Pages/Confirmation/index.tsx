import { useRef, useState } from 'react';
import FormComponent from '../../Components/FormComponent';
import './index.scss';

function Confirmation() {
    const [path, setPath] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onSubmit = async () => {
        console.log('define later');
    };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setPath(event.target.value);

    //     console.log('value is:', event.target.value);
    // };

    const fields = [
        {
            label: 'Nickname',
            type: 'text',
            placeholder: 'dos404',
            name: 'Nickname'
            // validation: {
            //     required: 'nickname is required'
            // }
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
                        <div className='avatar'>
                            <label //
                                htmlFor="file-upload"
                                className="uploader"
                            >
                                {path != '' ? (
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
                                        // onChange={handleChange}
                                        onChange={() => {
                                            const file =
                                                inputRef.current?.files?.[0];
                                            if (file) {
                                                console.log(file);
                                                const fileURL =
                                                    URL.createObjectURL(file);
                                                console.log(fileURL);
                                                setPath(fileURL);
                                            }
                                        }}
                                        ref={inputRef}
                                    />
                                )}
                            </label>
                            <div className="cancel-avatar"></div>
                        </div>
                        <span className="text">
                            Max size: 4MB
                            <br />
                            Supported format: PNG, JPG
                        </span>
                    </div>
                    <div className="section2">
                        <button className="avatar-uploader-btn">
                            Choose image
                        </button>
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
    );
}

export default Confirmation;
