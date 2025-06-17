"use client";

import React from 'react';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';

interface HoverCardProps {
    imageSrc: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ imageSrc }) => {
    return (
        <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1500}
            scale={1.02}
            transitionSpeed={800}
            glareEnable={false}
            trackOnWindow={false}
            style={{
                position: "fixed",
                left: "40px",
                top: "40px",
                width: "600px",
                height: "calc(100vh - 80px)",
                maxWidth: "33.25%",
                minWidth: "33.25%",
                zIndex: 20,
            }}
        >
            {/* Tiltable Content */}
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "30px",
                    overflow: "hidden", // içerideki resim ve gölge düzgün kırpılır
                    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
                    transform: "translateZ(40px)",
                }}
            >
                <Image
                    src={imageSrc}
                    priority
                    width={600}
                    height={1000}
                    alt=""
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        display: "block", // önemli: inline-element default'u kaldırır
                    }}
                />
            </div>
        </Tilt>
    );
};

export default HoverCard;
