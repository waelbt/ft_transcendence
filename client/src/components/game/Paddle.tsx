const Paddle = ({ color, pos }: { color: string; pos: string }) => {
    const paddleStyle: React.CSSProperties = {
        width: '1.375rem',
        height: '6.625rem',
        backgroundColor: color,
        position: 'relative',
        top: `${pos}`,
        boxShadow: `0 0 1.25rem ${color}`,
        marginInline: '1.25rem',
        zIndex: 6
    };

    return <div style={paddleStyle}></div>;
};

export default Paddle;
