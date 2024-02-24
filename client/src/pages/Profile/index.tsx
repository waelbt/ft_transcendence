import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserProfileCard } from '../../components/';
import { useParams } from 'react-router-dom';
import { useGetUserInfos } from '../../hooks/getUserInfos';
import { useUserStore } from '../../stores/userStore';
import Skeleton from 'react-loading-skeleton';
import useGameStore from '../../stores/gameStore';
import toast from 'react-hot-toast';

export function Profile() {
    const { id: paramId } = useParams();
    const currentUser = useUserStore();
    const isCurrentUser = paramId === 'me' || paramId === currentUser.id;
    const {
        user,
        relation,
        friendsIds,
        blocksIds,
        isLoading,
        isError,
        error,
        refetch
    } = useGetUserInfos(
        paramId as string,
        ['profile', isCurrentUser ? 'me' : (paramId as string)],
        isCurrentUser
    );

    /*************************** */

    useEffect(() => {
        console.log(user);
        refetch();
    }, [isCurrentUser, isCurrentUser ? currentUser : paramId, refetch, error]);

    const { socket: gameSocket, updateState : updateStateGame } = useGameStore();
    const {id  : userId} = useUserStore();
    
    const navigate = useNavigate();


    useEffect(() => {
        console.log('start startgame useEffect');
        gameSocket?.on('startgame', ({ room, SecondPlayer, opponentId, chosen }) => {
            console.log(SecondPlayer);
            updateStateGame({
                isSecondPlayer: SecondPlayer === 1,
                roomId: room,
                isGameReady: true,
                opponentId,
                gameMode: chosen
            });
            // setIsEventOpen(false);
            // window.location.href =(`/game/${room}`);
            navigate(`/game/${room}`);
        });

        return () => {
            gameSocket?.off('startgame');
            console.log('stop startgame useEffect');

        };
    }, [gameSocket]);

    useEffect(() => {
        gameSocket?.on('challenge', () => {
            toast((t) => (
                <div className=" justify-center items-center flex flex-row gap-3">
                    <span>
                        you have been challenged by{' '}
                    </span>
                    <button 
                        className=' rounded-lg border border-green-500 p-1 text-green-500' 
                        onClick={() =>{ 
                            gameSocket.emit('friends', {userid : '', myid:userId})
                            toast.dismiss(t.id)
                        }}
                    >
                        Accept
                    </button>
                    <button 
                        className=' rounded-lg border border-red-500 p-1 text-red-500' 
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                  </div>
              ));
        });
        return () => {gameSocket?.off('challenge')};
    }, [gameSocket]);


    /*************************** */
    if (isLoading) {
        return (
            <div className="flex-col h-full justify-center items-center inline-flex gap-5">
                <div className="px-2.5 rounded-[20px] shadow justify-start items-center gap-5 inline-flex bg-white">
                    {/* Replace actual content with Skeleton components */}
                    <div className="px-5 py-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
                        <Skeleton circle height={160} width={160} />
                        <Skeleton height={30} width={200} />
                    </div>
                    <div className="flex-col justify-center items-start inline-flex pt-4">
                        <Skeleton height={30} width={300} />
                        <Skeleton height={130} width={553} />
                    </div>
                    <div className="px-3 py-3 rounded-2xl flex-col justify-center items-center gap-3 inline-flex">
                        <Skeleton height={50} width={200} />
                        <Skeleton height={20} width={150} />
                    </div>
                </div>
                <div className="flex-grow max-h-[560px] w-full bg-white p-1 items-start justify-start mb-2 rounded-[20px] shadow"></div>
            </div>
        );
    }

    if (isError) {
        return <div>Error fetching profile</div>;
    }

    return (
        <div className="flex-col h-full justify-center items-center inline-flex gap-5">
            <UserProfileCard
                {...user}
                relationship={relation}
                isCurrentUser={isCurrentUser}
            />
            <div className="flex-grow max-h-[560px] w-[1100px] bg-white p-1 items-start justify-start mb-2 rounded-[20px] shadow  border border-stone-300">
                <Outlet
                    context={{ isCurrentUser, paramId, friendsIds, blocksIds }}
                />
            </div>
        </div>
    );
}
