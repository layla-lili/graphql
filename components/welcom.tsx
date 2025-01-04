// components/WelcomeComponent.tsx
"use client";
import { Head } from 'next/document';
import React from 'react';

const WelcomeComponent: React.FC = () => {
  return (
    <>
  
  <div className="relative w-full h-screen overflow-hidden text-white bg-black font-mono">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(127,0,173,0.6) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 90%), 
                            url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/31787/stars.jpg)`,
        }}
      ></div>

      {/* Overlay */}
      <div id="overlay" className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-6xl font-extrabold animate-pulse">Neon Effect</h1>
      </div>

      {/* Layer 0 */}
      <div
        id="layer-0"
        className="absolute bottom-0 left-0 w-[200vw] h-[400px] opacity-100 transform perspective-200 rotate-x-[60deg] -z-10"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,71,255,1) 100%)`,
        }}
      ></div>

      {/* Layer 1 */}
      <div
        id="layer-1"
        className="absolute inset-0 w-full h-full opacity-100 -z-10"
        style={{
          background: `linear-gradient(45deg, rgba(92,71,255,1) 0%, rgba(92,71,255,0) 50%, rgba(92,71,255,0) 100%)`,
        }}
      ></div>

      {/* Layer 2 */}
      <div
        id="layer-2"
        className="absolute inset-0 w-full h-full opacity-100 -z-10"
        style={{
          background: `linear-gradient(-45deg, rgba(92,71,255,0) 0%, rgba(92,71,255,0) 50%, rgba(92,71,255,1) 100%)`,
        }}
      ></div>

      {/* Additional Custom Layers */}
      <div
        id="layer-corner"
        className="absolute inset-0 w-full h-full opacity-100 -z-10"
        style={{
          background: `linear-gradient(to bottom, rgba(71,255,203,1) 0%, rgba(96,130,223,0) 54%, rgba(117,24,240,0) 100%)`,
        }}
      ></div>

      <div id="lines" className="absolute top-0 left-0 w-full h-[400px] z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #60DCD3, #60DCD3 2px, transparent 1px, transparent 40px),
                            repeating-linear-gradient(-90deg, #60DCD3, #60DCD3 2px, transparent 2px, transparent 40px)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>
    </div>
  </>
  );
};

export default WelcomeComponent;