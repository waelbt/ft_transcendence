import { useEffect } from 'react';
import { MatchPanel } from '../../components/MatchPanel';
import useGameStore from '../../stores/gameStore';
// import useTimer from '../../hooks/timer';
import useFriendPrevious from '../../hooks/friendPreviousHook';

export const play = () => {
    const { socket, opponentId } = useGameStore();
    const {
        isLoading,
        isError,
        success,
        friend: opponent
    } = useFriendPrevious(opponentId);

    useEffect(() => {
        if (isError) {
            // !navigate back
            // !emet event to cancel the matching
            // ! notify the user
        }
    }, [socket]);

    return (
        <div className="flex-grow h-full p-2.5 flex-col justify-center items-center gap-5 inline-flex">
            <MatchPanel opponent={opponent} isStarted={success} />
            <div className="flex-grow max-h-[560px] w-full bg-white p-1 items-start justify-start mb-2 rounded-[20px] shadow">
                {isLoading && <p>The game will start soon..</p>}
            </div>
        </div>
    );
};
