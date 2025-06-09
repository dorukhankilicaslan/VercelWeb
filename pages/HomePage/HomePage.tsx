// @/pages/HomePage/HomePage.tsx
import React, { forwardRef } from 'react';
import Image from "next/image";
import SlidingButton from "@/components/SlidingButton";
import HoverCard from '@/components/HoverCard/HoverCard';


const HomePage = forwardRef<HTMLDivElement, { setPage: React.Dispatch<React.SetStateAction<string>> }>(({ setPage }, ref) => {
    return (
        <div ref={ref} className="bg-[var(--background)] absolute max-md:flex justify-center max-md:pt-5 inset-0" style={{ overflow: "hidden", height: "100%", width: "100%" }}>

            <div className="hidden lg:flex fixed z-0" style={{ transform: "rotate(-15deg)", width: "100vw", height: "200vh", left: "-83%", top: "-50%", backgroundColor: "var(--primary)" }}></div>

            <div className="z-1 flex items-center justify-center md:min-w-screen min-h-screen">
                <div className="hidden lg:flex w-7/20 lg:w-3/10 p-5">
                    <HoverCard imageSrc="/test.webp" />
                </div>

                <div className="min-h-dvh flex items-center justify-center text-5xl md:text-3xl font-bold z-2 mainPageRightSideMain" style={{ maxWidth: "50%" }}>
                    <div className="flex flex-col text-center items-center lg:items-start lg:justify-center lg:text-left mt-10 md:mt-0">

                        <div className="hidden md:flex lg:hidden -md:hidden items-center justify-center mb-4">
                            <Image src={"/test.webp"} priority={true} width={200} height={0} alt="mobileProfileImage"
                                className='border-2 rounded-full'
                                style={{
                                    borderColor: "var(--primary)",
                                    maxHeight: "200px",
                                    objectFit: "cover",
                                    borderRadius: "999px",
                                }}
                            />
                        </div>

                        <h1 className="flex items-center -md:text-center md:justify-center lg:justify-start lg:items-start">
                            <ul>
                                <li className="flex items-center">
                                    <hr className="hidden lg:flex w-10 border-t-5 rounded mr-3" style={{ color: "var(--primary)" }} />
                                    <span className="uppercase text-3xl leading-1 md:leading-tight md:text-4xl whitespace-nowrap" style={{ fontFamily: "Poppins", color: "var(--primary)" }}>I'm steve milner.</span>
                                </li>
                                <li>
                                    <span className='uppercase text-3xl leading-1 md:leading-tight md:text-4xl whitespace-nowrap' style={{ fontFamily: "Poppins", color: "var(--foreground)" }}>WEB DESIGNER</span>
                                </li>
                            </ul>
                        </h1>

                        <p className="text-lg font-semibold mt-4 max-w-70 md:min-w-120 xl:max-w-200 text-wrap text-left break-words md:text-center lg:text-start"
                            style={{ fontFamily: "Open Sans", color: "var(--foreground)" }}>
                            I'm a Tunisian based web designer & front‑end developer focused on crafting clean &
                            user‑friendly experiences, I am passionate about building excellent software
                            that improves the lives of those around me.
                        </p>
                        <div className="mt-2 md:mt-4 lg:mt-10">
                            <SlidingButton text="MORE ABOUT ME" setPage={setPage} link="#about" iconRight='mr-3.5' buttonWidth="w-60" buttonHeight="h-12" textLeftMargin='ml-6' />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
});

HomePage.displayName = 'HomePage';
export default HomePage;