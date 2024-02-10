import { useState, useEffect } from 'react';

const useTimer = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        setElapsedTime(0);
        const newTimer = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);
        setTimer(newTimer);
    };

    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
    };

    useEffect(() => {
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timer]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };
    return { elapsedTime, formatTime, startTimer, stopTimer };
};

export default useTimer;
