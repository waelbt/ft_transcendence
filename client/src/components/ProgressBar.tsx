import { useEffect, useState } from 'react';

type ProgressBarProps = {
    value: number;
    max?: number;
};

const ProgressBar = ({ value, max = 100 }: ProgressBarProps) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const finalWidth = `${Math.min((value / max) * 100, 100)}%`;

        const styleSheet = document.createElement('style');
        styleSheet.innerText = `
            @keyframes expandBar {
                from { width: 0%; }
                to { width: ${finalWidth}; }
            }
        `;
        document.head.appendChild(styleSheet);

        setLoaded(true);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, [value, max]);

    const barStyle = {
        backgroundColor: '#FCBC51',
        backgroundSize: '40px 40px',
        backgroundImage: `linear-gradient(
            45deg,
            rgba(252, 183, 17, 0.6) 25%,
            transparent 25%,
            transparent 50%,
            rgba(252, 183, 17, 0.6) 40%,
            rgba(252, 183, 17, 0.6) 75%,
            transparent 75%,
            transparent
        )`,
        animation: loaded ? 'expandBar 2s ease-in-out forwards' : ''
    };

    return (
        <div className="w-full border rounded-full border-stone-300 mx-auto text-center relative">
            <div className="rounded-full bg-white">
                <div className="h-4 rounded-full" style={barStyle} />
            </div>
        </div>
    );
};

export default ProgressBar;
