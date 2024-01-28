// import { MouseEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSocketStore } from '../../stores/socketStore';
// import { MODES } from '../../constants';
// import { useState } from 'react';
// import { MatchResultModal, Modal } from '../../components';
// import { useModelStore } from '../../stores/ModelStore';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../../stores/gameStore';
import { useEffect } from 'react';
// import { useUserStore } from '../../stores/userStore';

export function Lobby() {
    // const { isEventOpen, openEvent } = useModelStore();
    // const [isModalOpen, setIsModalOpen] = useState(true);
    // const closeModal = () => setIsModalOpen(false);
    const { socket } = useGameStore();
    const navigate = useNavigate();
    // const navigate = useNavigate();
    // const user = useUserStore();

    const handleClick = () => {
        // navigate(`/game/${mode}`);\
        socket?.emit('gameMode', 'classic');
    };

    // Example socket listener in your Home or relevant component
    useEffect(() => {
        socket?.on('roomCreated', (roomId) => {
            navigate(`/game/${roomId}`);
        });
    }, [socket, navigate]);

    return (
        <div className="flex flex-col gap-2">
            <button className="p-4 bg-red-500 text-white" onClick={handleClick}>
                classic{' '}
            </button>
            {/* {MODES.map((mode) => (
                <button
                    className="p-4 bg-red-500 text-white"
                    onClick={() => {
                        navigate(`/game/${mode}`);
                        socket.emit('selectMode', mode);
                    }}
                >
                    {mode}
                </button>
            ))} */}
            {/* <div className="container">
                <button
                    onClick={() => {
                        openEvent();
                    }}
                >
                    Open modal
                </button>
                {isEventOpen && (
                    <Modal>
                        <MatchResultModal />
                    </Modal>
                )}
            </div> */}
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
