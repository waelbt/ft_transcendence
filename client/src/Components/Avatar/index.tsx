import './index.scss';

type AvatarProps = {
    src: string;
};

function Avatar(props: AvatarProps) {
    return (<div className="avatar-container">
        <img src={props.src} alt="Avatar" className="avatar-image" />
    </div>);
}

export default Avatar;
