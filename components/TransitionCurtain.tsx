// @/components/TransitionCurtain.tsx
"use client";

import React, { forwardRef } from 'react';

interface TransitionCurtainProps {
    children: React.ReactNode;
}

const TransitionCurtain = forwardRef<HTMLDivElement, TransitionCurtainProps>(
    ({ children }, ref) => {
        return (
            <div ref={ref} className="transition-curtain-container">
                {children}
                <div className="transition-overlay"></div>
            </div>
        );
    }
);

TransitionCurtain.displayName = 'TransitionCurtain';
export default TransitionCurtain;