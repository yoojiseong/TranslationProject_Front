import React from 'react';
import './MinCharacterCounter.css';

const MinCharacterCounter = ({ 
    text, 
    minLength = 50, 
    toolName = "요약",
    className = '',
    style = {}
}) => {
    const currentLength = text ? text.length : 0;
    const isValid = currentLength >= minLength;
    const remaining = Math.max(minLength - currentLength, 0);

    return (
        <div className={`min-char-counter ${className}`} style={style}>
            <div className="counter-display">
                <span className={`char-count ${isValid ? 'valid' : 'invalid'}`}>
                    {currentLength}자
                </span>
                <span className="divider">|</span>
                <span className="requirement">
                    {isValid ? (
                        <span className="success">✓ 조건 충족</span>
                    ) : (
                        <span className="warning">{remaining}자 더 필요</span>
                    )}
                </span>
            </div>
            
            {!isValid && (
                <div className="help-text">
                    {toolName}을 위해 최소 {minLength}자 이상 입력해주세요.
                </div>
            )}
        </div>
    );
};

export default MinCharacterCounter;
