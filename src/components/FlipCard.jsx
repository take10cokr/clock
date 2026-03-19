import React, { useEffect, useState, useRef } from 'react';

export default function FlipCard({ digit, themeColor }) {
  const [currentValue, setCurrentValue] = useState(digit);
  const [nextValue, setNextValue] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (digit !== currentValue) {
      setNextValue(digit);
      setIsFlipping(true);
      
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCurrentValue(digit);
        setIsFlipping(false);
      }, 700); 
    }
  }, [digit, currentValue]);

  // Subtle glow using the inherited themeColor
  const glowStyle = { textShadow: `0 0 25px ${themeColor}60` };

  return (
    <div className={`flip-card ${isFlipping ? 'flipping' : ''}`}>
      <div className="top">
        <span style={glowStyle}>
          {isFlipping ? nextValue : currentValue}
        </span>
      </div>
      <div className="bottom">
        <span style={glowStyle}>
          {currentValue}
        </span>
      </div>
      
      {isFlipping && (
        <>
          <div className="flap-top">
            <span style={glowStyle}>{currentValue}</span>
          </div>
          <div className="flap-bottom">
            <span style={glowStyle}>{nextValue}</span>
          </div>
        </>
      )}
    </div>
  );
}
