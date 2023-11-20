import { FC } from 'react';

interface ProgressRingProps {
    style: string;
    radius: number;
    stroke: number;
    progress: number;
}

const ProgressRingLoader: FC<ProgressRingProps> = ({
    style,
    radius,
    stroke,
    progress
}) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className={style}>
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
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
        </div>
    );
};

export default ProgressRingLoader;
