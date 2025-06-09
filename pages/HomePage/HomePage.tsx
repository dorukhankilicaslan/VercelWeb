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

            <div className="colorBlock absolute z-0" style={{ transform: "rotate(-15deg)", width: "100%", height: "200%", left: "-83%", top: "-50%", backgroundColor: "var(--secondary)" }}></div>

            <div className="h-dvh flex z-1 main-content-container">
                <div className="profileImage relative w-2/5 p-5 flex items-center justify-center">
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

                <div className="w-3/5 h-dvh flex items-center justify-center text-white text-3xl font-bold z-5 mainPageRightSideMain" style={{ maxWidth: "50%" }}>
                    <div className="max-w-3xl flex flex-col items-center justify-center">

                        <div className="mobileImage items-center justify-center mb-10">
                            <Image src={"/test.webp"} priority={true} width={300} height={400} alt="mobileProfileImage"
                                className='d-none d-md-block'
                                style={{
                                    maxHeight: "300px",
                                    objectFit: "cover",
                                    borderRadius: "999px",
                                }}
                            />
                        </div>

                        <h1 className="flex items-center text-4xl">
                            <hr className="w-1/20 border-t-5 rounded mr-8 text-yellow-500 nameLine" style={{ marginTop: "-4.5rem", color: "var(--secondary)" }} />
                            <ul>
                                <li className="mb-3">
                                    <span className="uppercase" style={{ fontFamily: "Poppins", fontSize: "3rem", fontWeight: "700", color: "var(--secondary)" }}>I'm steve milner.</span>
                                </li>
                                <li className="mb-4">
                                    <span style={{ fontSize: "3rem", fontWeight: "700", color: "var(--foreground)" }}>WEB DESIGNER</span>
                                </li>
                            </ul>
                        </h1>

                        <p className="text-base font-normal mt-4 max-w-125 text-wrap text-left break-words"
                            style={{ fontSize: "1rem", lineHeight: "2rem", fontWeight: "500", fontFamily: "Open Sans", color: "var(--foreground)" }}>
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