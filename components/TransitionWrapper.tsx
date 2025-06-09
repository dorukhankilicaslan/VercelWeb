// @/components/TransitionWrapper.tsx
"use client";

import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import TransitionCurtain from './TransitionCurtain';

interface TransitionWrapperProps {
    children: React.ReactNode;
    pageKey: string;
    timeout?: number;
    classNames?: string;
    mode?: "out-in" | "in-out";
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
    children,
    pageKey,
    timeout = 400,
    classNames = "curtain-transition",
    mode = "out-in",
}) => {
    //console.log("Current pageKey:", pageKey); // console.log ekleyin

    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <SwitchTransition mode={mode}>
            <CSSTransition
                key={pageKey}
                nodeRef={nodeRef}
                classNames={classNames}
                timeout={timeout}
                appear={true} // Bu satırı ekliyoruz
            >
                <TransitionCurtain ref={nodeRef}>
                    {children}
                </TransitionCurtain>
            </CSSTransition>
        </SwitchTransition>
    );
};

export default TransitionWrapper;