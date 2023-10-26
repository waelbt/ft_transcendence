import { useRef, useState, useEffect, useCallback, FC } from 'react';

interface ProgressRingProps {
    radius: number;
    stroke: number;
    progress: number;
}

const ProgressRing: FC<ProgressRingProps> = ({ radius, stroke, progress }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;


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
                style={{ strokeDashoffset, transition: '.1s' }}
                //r={60}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};

const ProgressRingLoader: FC<{ controller: boolean }> = ({ controller }) => {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const reset = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current); // clear the interval
            intervalRef.current = null; // reset the interval ref
        }
        setProgress(0); // reset progress to 0
    }, []);

    useEffect(() => {
        if (controller) {
            reset();
            intervalRef.current = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 10;
                    if (newProgress === 100) {
                        clearInterval(intervalRef.current as NodeJS.Timeout); // clear the interval when progress reaches 100
                    }
                    return newProgress;
                });
            }, 1000);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current); // clear the interval on unmount
                }
            };
        } else
            reset();
    }, [controller , reset]);

    return <ProgressRing radius={66} stroke={4} progress={progress} />;
};

export default ProgressRingLoader;
