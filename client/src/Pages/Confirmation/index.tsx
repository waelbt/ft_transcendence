import Avatar from '../../Components/Avatar';
import FormComponent from '../../Components/FormComponent';
import './index.scss';

function Confirmation() {
    const onSubmit = async () => {
        console.log('define later');
    };

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
                        {/* <Avatar src="" /> */}
                        <div className="avatar-uploader">
                            <img
                                src="https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg"
                                alt="Avatar"
                                className="image"
                            />
                        </div>
                        <span className='text'>
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
                                <li className='item'></li>
                                <li className='item'></li>
                                <li className='item'></li>
                                <li className='item'></li>
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
