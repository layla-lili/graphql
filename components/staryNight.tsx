"use client";
import React, { JSX, useEffect, useState } from 'react';

const StarryBackground: React.FC = () => {
  const generateStars = (num: number, size: number) => {
    return Array.from({ length: num }, (_, index) => {
      const leftPosition = Math.random() * 100; // Random left position in percentage
      const topPosition = Math.random() * 100; // Random top position in percentage
      const opacity = Math.random(); // Random opacity for twinkling effect
      return (
        <div
          key={index}
          className={`absolute bg-transparent rounded-full`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${leftPosition}%`,
            top: `${topPosition}%`,
            boxShadow: `0 0 0 ${size}px rgba(118, 118, 118, ${opacity})`,
            animation: 'starsAnimation 50s linear infinite',
          }}
        />
      );
    });
  };

  const [smallStars, setSmallStars] = useState<JSX.Element[]>([]);
  const [mediumStars, setMediumStars] = useState<JSX.Element[]>([]);
  const [bigStars, setBigStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setSmallStars(generateStars(700, 1));
    setMediumStars(generateStars(200, 2));
    setBigStars(generateStars(100, 3));
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-r from-[#291e52] to-[#541853] overflow-hidden">
      <div className="absolute inset-0 z-0">{smallStars}</div>
      <div className="absolute inset-0 z-0">{mediumStars}</div>
      <div className="absolute inset-0 z-0">{bigStars}</div>
      <style>
        {`
          @keyframes starsAnimation {
            from { transform: translateY(-2000px); }
            to { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default StarryBackground;