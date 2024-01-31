// src/App.tsx
import React, { useEffect } from 'react';
import GameCanvas from './GameCanvas';
import useKeyboardPaddleControl from '../../hooks/KeyboardPaddleControl';

const Game: React.FC = () => {
    useKeyboardPaddleControl();

    return (
        <div className="App">
            <GameCanvas />
        </div>
    );
};

export default Game;
