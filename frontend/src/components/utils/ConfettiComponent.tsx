import React from "react";
import Confetti from 'react-confetti';

interface ConfettiComponentProps {
    active: boolean;
    width: number;
    height: number;
    visible: boolean
}

export const ConfettiComponent: React.FC<ConfettiComponentProps> = ({ active, visible, width, height }) => {
    return (
        <div className='z-10' style={{ transition: 'opacity 1s', opacity: visible ? 1 : 0, zIndex: 10 }}>
            {active && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={300}
                    gravity={0.1}
                    wind={0.01}
                    style={{ zIndex: 10 }}
                />
            )}
        </div>
    )
}