"use client";
import React from 'react';

interface Props {
    show: boolean;
}

const TransitionOverlay: React.FC<Props> = ({ show }) => {
    return (
        <div
            className="transition-overlay"
            style={{
                position: "fixed", // DOM akışından çıkar
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
                backgroundColor: "var(--primary)",
                transform: show ? "translateY(0%)" : "translateY(-100%)",
                transition: "transform 0.5s ease-in-out",
                pointerEvents: "none", // tıklamaları engelleme
            }}
        />
    );
};

export default TransitionOverlay;
