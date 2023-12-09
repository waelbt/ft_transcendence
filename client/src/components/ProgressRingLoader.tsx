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
        <div className={`relative ${style}`}>
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transition-transform transform -rotate-90 origin-center"
            >
                <circle
                    style={{ position: 'relative' }}
                    stroke="#F6F6F6" // ! Set your desired color for uncompleted part
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
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
                />{' '}
            </svg>
            {children}
        </div>
    );
};

export default ProgressRingLoader;

