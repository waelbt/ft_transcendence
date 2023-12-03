import { FC, ReactNode } from 'react';

interface ProgressRingProps {
    style: string;
    color?: string;
    radius: number;
    stroke: number;
    progress: number;
    children?: ReactNode;
}

const ProgressRingLoader: FC<ProgressRingProps> = ({
    style,
    radius,
    stroke,
    progress,
    color,
    children
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
                    style={{ position: 'relative' }}
                    stroke="#F6F6F6" // Set your desired color for uncompleted part
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <foreignObject
                    x="0"
                    y="0"
                    width={radius * 2}
                    height={radius * 2}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '0%',
                            transform: 'translate(0, 0%)'
                        }}
                    >
                        {children}
                    </div>
                </foreignObject>
                <circle
                    stroke={`${color ? color : 'red'} `}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset, transition: '.1s' }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
        </div>
    );
};

export default ProgressRingLoader;
