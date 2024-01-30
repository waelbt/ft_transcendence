const Score = ({
    leftScore,
    rightScore,
    lColor,
    rColor
}: {
    leftScore: number;
    rightScore: number;
    lColor: string;
    rColor: string;
}) => {
    const leftScoreStyle: React.CSSProperties = {
        position: 'absolute',
        left: '15%',
        top: '0',
        textAlign: 'center',
        color: `${lColor}`,
        fontSize: '3rem',
        paddingTop: '5%',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1
    };

    const rightScoreStyle: React.CSSProperties = {
        position: 'absolute',
        right: '15%',
        top: '0',
        textAlign: 'center',
        color: `${rColor}`,
        fontSize: '3rem',
        paddingTop: '5%',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1
    };

    return (
        <>
            <div style={leftScoreStyle}>{leftScore}</div>
            <div style={rightScoreStyle}>{rightScore}</div>
        </>
    );
};

export default Score;
