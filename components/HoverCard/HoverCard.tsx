// components/HoverCard/HoverCard.tsx
"use client";

import React from 'react';
import Tilt from 'react-parallax-tilt'; // Using react-parallax-tilt
import './HoverCard.css'; // Will contain the card's specific styles

interface HoverCardProps {
    // Add any props for the card content if needed
}

const HoverCard: React.FC<HoverCardProps> = () => {
    return (
        <Tilt
            className="card"
            perspective={1000} // Same as CodePen's tilt perspective
            glareEnable={true} // Enable glare
            glareMaxOpacity={0.5} // Adjust glare intensity
            scale={1.1} // Scale effect on hover
            transitionEasing="cubic-bezier(.03,.98,.52,.99)" // Matching CodePen easing
            transitionSpeed={400} // Matching CodePen speed
            trackOnWindow={false} // Only track mouse on the element itself
            reset={true}
        >
            <div className="quest">
                <img src="https://assets.codepen.io/3165458/quest.png" alt="Meta Quest 3" />
            </div>
            <article className="text">
                <h2>Grab A Device</h2>
                <p>Your journey into spatial starts now. Get Meta Horizon OS for yourself or power up your entire team.</p>
                <a href="#">Purchase a Meta Quest</a>
            </article>
        </Tilt>
    );
};

export default HoverCard;
