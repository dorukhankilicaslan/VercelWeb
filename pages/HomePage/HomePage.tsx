// @/pages/HomePage/HomePage.tsx
import React, { forwardRef } from "react";
import Image from "next/image";
import SlidingButton from "@/components/DemoPageParts/SlidingButton";
import HoverCard from "@/components/DemoPageParts/HoverCard/HoverCard";

const HomePage = forwardRef<
  HTMLDivElement,
  { setPage: (page: string) => void }
>(({ setPage }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-[var(--background)] absolute max-md:flex justify-center max-md:pt-5 inset-0"
      style={{ overflow: "hidden", height: "100%", width: "100%" }}
    >
      <div
        className="hidden lg:flex fixed z-0"
        style={{
          transform: "rotate(-15deg)",
          width: "100vw",
          height: "200vh",
          left: "-83%",
          top: "-50%",
          backgroundColor: "var(--primary)",
        }}
      ></div>

      <div className="z-1 flex items-center justify-center md:min-w-screen min-h-screen">
        <div className="hidden lg:flex w-7/20 lg:w-3/10 p-5">
          <HoverCard imageSrc="/test.webp" />
        </div>

        <div
          className="min-h-dvh flex items-center justify-center text-5xl md:text-3xl font-bold z-2 lg:ml-[4rem]"
          style={{ maxWidth: "50%" }}
        >
          <div className="flex flex-col text-center items-center lg:items-start lg:justify-center lg:text-left mt-10 md:mt-0">
            <div className="hidden md:flex lg:hidden -md:hidden items-center justify-center mb-4">
              <Image
                src={"/test.webp"}
                priority={true}
                width={200}
                height={0}
                alt="mobileProfileImage"
                className="border-2 rounded-full"
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
                  <hr
                    className="hidden lg:flex w-10 border-t-5 rounded mr-3 lg:ml-[-3.5rem]"
                    style={{ color: "var(--primary)" }}
                  />
                  <span
                    className="uppercase text-[var(--primary)] 
                    text-4xl md:text-5xl xl:text-6xl
                    leading-8 md:leading-tight md:whitespace-nowrap"
                  >
                    <span>Dorukhan </span>
                    <span>KILIÇASLAN</span>
                  </span>
                </li>
                <li className="mt-4 md:mt-0">
                  <span
                    className="uppercase 
                  md:flex md:flex-row md:justify-center
                  lg:block lg:justify-start
                  whitespace-nowrap font-poppins text-foreground"
                  >
                    {" "}
                    <div className="flex flex-col md:flex-row">
                      {" "}
                      <span className="text-2xl md:text-2xl xl:text-4xl">
                        GRAFİK VE WEB
                      </span>
                      <span className="text-xl md:text-2xl xl:text-4xl md:ml-2">
                        TASARIM UZMANI
                      </span>{" "}
                    </div>
                  </span>
                </li>
              </ul>
            </h1>

            <p
              className="text-sm text-center md:text-lg lg:text-lg xl:text-xl font-semibold mt-4 max-w-70 md:min-w-120 xl:max-w-200 text-wrap md:text-left
              break-words lg:text-start"
              style={{ fontFamily: "Open Sans", color: "var(--foreground)" }}
            >
              Temiz, kullanıcı odaklı ve estetik deneyimler yaratmaya
              odaklanıyorum. Çevremdekilerin hayatını kolaylaştıran, fonksiyonel
              ve modern yazılımlar geliştirmek benim tutkum.
            </p>
            <div className="mt-2 md:mt-4 lg:mt-10">
              <SlidingButton
                text="HAKKIMDA DAHA FAZLASI"
                setPage={setPage}
                link="#about"
                iconRight="mr-3.5"
                buttonWidth="w-75"
                buttonHeight="h-12"
                textLeftMargin="ml-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
