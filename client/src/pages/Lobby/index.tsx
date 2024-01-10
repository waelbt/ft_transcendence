// import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocketStore } from '../../stores/socketStore';
import { MODES } from '../../constants';
// import { useUserStore } from '../../stores/userStore';

export function Lobby() {
    const {socket} = useSocketStore();
    const navigate = useNavigate();
    // const user = useUserStore();

    return (
        <div className="flex flex-col gap-2">
            {MODES.map((mode) => (
                <button
                    className="p-4 bg-red-500 text-white"
                    onClick={() => {
                        navigate(`/game/${mode}`);
                        socket.emit('selectMode', mode);
                    }}
                >
                    {mode}
                </button>
            ))}
        </div>
    );
}

// <div className="flex flex-col gap-1">
//     <div>nickName {user.nickName}</div>
//     <div>fullName {user.fullName}</div>
//     <div>email {user.email}</div>
//     <div>createdAt {user.createdAt}</div>
//     <div>inGame {user.inGame}</div>
//     <div>isLogged {user.isLogged ? 'true' : false}</div>
//     <div>id {user.id}</div>
//     <div>F2A {user.F2A}</div>
// </div>
