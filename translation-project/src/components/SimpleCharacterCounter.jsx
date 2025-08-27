import React from 'react';
import './SimpleCharacterCounter.css';

const SimpleCharacterCounter = ({ 
    text, 
    className = '',
    style = {}
}) => {
    const currentLength = text ? text.length : 0;

    return (
        <div className={`simple-char-counter ${className}`} style={style}>
            <div className="counter-display">
                <span className="char-count">
                    {currentLength}자
                </span>
            </div>
        </div>
    );
};

export default SimpleCharacterCounter;
