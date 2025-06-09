// @/pages/HomePage/HomePage.tsx
import React, { forwardRef } from 'react';
import Image from "next/image";
import SlidingButton from "@/components/SlidingButton";


const HomePage = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        // Removed: relative, overflow-hidden, height, width, padding, margin from here.
        // Let the CSS transition class handle positioning and width during animation.
        // We'll apply a common class for general page content layout.
        <div ref={ref} className="page-content-wrapper" style={{ backgroundColor: "var(--background)" }}>

            {/* Colored Shape at Left */}
            <div className="hidden lg:flex absolute z-0" style={{ transform: "rotate(-15deg)", width: "100vw", height: "200vh", left: "-83%", top: "-50%", backgroundColor: "var(--secondary)" }}></div>

            {/* Main Container for Text and Mobile Image */}
            <div className="z-1 h-dvh flex items-center justify-center">
                <div className="hidden lg:flex w-7/20 lg:w-3/10 p-5 items-center justify-center">
                    <Image src={"/test.webp"} priority={true} width={600} height={1000} alt=""
                        className="shadow-[0_0_15px_rgba(0,0,0,0.75)]"
                        style={{
                            left: "40px",
                            top: "40px",
                            width: "600px",
                            height: "calc(100vh - 80px)",
                            objectFit: "cover",
                            position: "fixed",
                            borderRadius: "30px",
                            maxWidth: "33.25%",
                            minWidth: "33.25%"
                        }}
                    />
                </div>

                <div className="md:w-3/5 h-dvh flex items-center justify-center text-5xl md:text-3xl font-bold z-5 mainPageRightSideMain" style={{ maxWidth: "50%" }}>
                    <div className="flex flex-col text-center items-center lg:items-start lg:justify-center lg:text-left">

                        <div className="hidden md:flex lg:hidden -md:hidden items-center justify-center mb-5">
                            <Image src={"/test.webp"} priority={true} width={200} height={400} alt="mobileProfileImage"
                                className='border-2 rounded-full'
                                style={{
                                    borderColor: "var(--secondary)",
                                    maxHeight: "200px",
                                    objectFit: "cover",
                                    borderRadius: "999px",
                                }}
                            />
                        </div>

                        <h1 className="flex items-center -md:text-center md:justify-center lg:justify-start lg:items-start">
                            <ul>
                                <li className="flex items-center">
                                    <hr className="hidden lg:flex w-10 border-t-5 rounded mr-3" style={{ color: "var(--secondary)" }} />
                                    <span className="uppercase text-3xl leading-1 md:leading-tight md:text-5xl whitespace-nowrap" style={{ fontFamily: "Poppins", color: "var(--secondary)" }}>I'm steve milner.</span>
                                </li>
                                <li className="mb-3 ">
                                    <span className='uppercase text-3xl leading-1 md:leading-tight md:text-5xl whitespace-nowrap' style={{ fontFamily: "Poppins", color: "var(--foreground)" }}>WEB DESIGNER</span>
                                </li>
                            </ul>
                        </h1>

                        <p className="text-lg font-semibold mt-4 max-w-70 md:max-w-150 lg:max-w-120 xl:max-w-200 text-wrap text-left break-words md:text-center lg:text-start"
                            style={{ fontFamily: "Open Sans", color: "var(--foreground)" }}>
                            I'm a Tunisian based web designer & front‑end developer focused on crafting clean &
                            user‑friendly experiences, I am passionate about building excellent software
                            that improves the lives of those around me.
                        </p>
                        <div style={{ marginTop: "2rem" }}>
                            <SlidingButton />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
});

HomePage.displayName = 'HomePage';
export default HomePage;