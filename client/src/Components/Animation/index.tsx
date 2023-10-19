import { useState, useEffect, FC } from 'react';

interface ProgressRingProps {
    radius: number;
    stroke: number;
    progress: number;
}

const ProgressRing: FC<ProgressRingProps> = ({ radius, stroke, progress }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;


    console.log("log : ", strokeDashoffset);

    return (
        <svg
            height={radius * 2}
            width={radius * 2}
            style={{
                transition: 'stroke-dashoffset 0.35s',
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%'
            }}
        >
            <circle
                stroke="red"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset, transition: '.3s' }}
                //r={60}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};

const Loader: FC<{width:number}> = ({width}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // emulating progress
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 10;
                if (newProgress === 100) {
                    clearInterval(interval);
                }
                return newProgress;
            });
        }, 1000);

        return () => clearInterval(interval); // Clear interval on unmount
    }, []);

    return <ProgressRing radius={60} stroke={4} progress={progress} />;
};

export default Loader;
