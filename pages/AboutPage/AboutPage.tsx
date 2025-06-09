// pages/AboutPage/AboutPage.tsx
"use client"; // Bu bileşen istemci tarafında çalışmalıdır
import React, { forwardRef } from 'react';

import PersonalInfo from '@/components/PersonalInfo';
import ExperienceSection from '@/components/ExpirenceSection';

const AboutPage = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className="w-full h-screen md:px-10 lg:px-25 overflow-y-auto">

            <h1 className='isolate justify-self-center text-center grid place-items-center mb-15 '>
                <span className='col-start-1 row-start-1 text-9xl font-black text-[var(--passive)] z-0'>RESUME</span>
                <span className='col-start-1 row-start-1 mt-2 text-6xl font-black text-[var(--foreground)] z-1'>
                    <span className='text-[var(--primary)]'>ÖZ</span>GEÇMİŞ
                </span>
            </h1>

            <PersonalInfo />
            <ExperienceSection />

        </div >
    );
})

AboutPage.displayName = 'HomePage';
export default AboutPage;