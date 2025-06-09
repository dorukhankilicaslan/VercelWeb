// @/components/PersonalInfo.tsx

import SlidingButton from "./SlidingButton";
import ExperienceBox from "./ExperienceBox";


export default function PersonalInfo() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-20">

            <div className="lg:col-span-5 xl:col-span-6">
                <div className="grid grid-cols-2 gap-4">

                    <div className="col-span-2">
                        <h3 className="uppercase font-semibold text-2xl" style={{ fontFamily: "poppins" }}>
                            personal info
                        </h3>
                    </div>

                    <div className="grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 col-span-1">
                        <ul>
                            <li className="mb-[20px] flex flex-col xl:flex-row xl:items-center">
                                <span className="opacity-75 w-[130px]">First Name :</span>
                                <span className="font-semibold">Dorukhan</span>
                            </li>
                            <li className="mb-[20px] flex flex-col xl:flex-row xl:items-center">
                                <span className="opacity-75 w-[130px]">Last Name :</span>
                                <span className="font-semibold">KILIÇASLAN</span>
                            </li>
                            <li className="mb-[20px] flex flex-col xl:flex-row xl:items-center">
                                <span className="opacity-75 w-[130px]">Email :</span>
                                <span className="font-semibold">drkhn.dk@gmail.com</span>
                            </li>
                            <li className="mb-[20px] flex flex-col xl:flex-row xl:items-center">
                                <span className="opacity-75 w-[130px]">Adres :</span>
                                <span className="font-semibold">Beylikdüzü / İST.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 col-span-1">
                        <ul>
                            <li className="mb-[20px] flex flex-col xl:flex-row xl:items-center">
                                <span className="opacity-75 w-[130px]">Telegram :</span>
                                <span className="font-semibold">dorukhan.k</span>
                            </li>
                            <li className="mb-[20px] flex flex-col xl:flex-row xl:items-center">
                                <span className="opacity-75 w-[130px]">Discord :</span>
                                <span className="font-semibold">Orway</span>
                            </li>
                            <li className="mb-[20px] flex flex-col xl:flex-row xl:items-center">
                                <span className="opacity-75 w-[130px]">Diller :</span>
                                <span className="font-semibold">Türkçe, English</span>
                            </li>
                            <li className="mb-[20px] flex flex-col xl:flex-row xl:items-center">
                                <span className="opacity-75 w-[130px]">Freelance :</span>
                                <span className="font-semibold text-[var(--success)]">Available</span>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-2">
                        <SlidingButton onNewTab={true} text={"Download CV"} link={"./dk_resume.pdf"} buttonHeight="h-10" buttonWidth="w-48" />
                    </div>

                </div>
            </div>

            {/* Sağ Sütun: İstatistikler */}
            {/* lg ekranlarda 7/12, xl ekranlarda 6/12 (yani yarısı) genişliğinde */}
            <div className="lg:col-span-7 xl:col-span-6 mt-10 lg:mt-0">
                <div className="grid grid-cols-2 gap-6"> {/* İstatistik kutuları için grid */}

                    <ExperienceBox number={"6 YIL"} text1="GRAFİK VE YAZILIM" text2="ALANINDA DENEYİM" />

                    <ExperienceBox number={"7"} text1="FARKLI SEKTÖRDE" text2="İŞ DENEYİMİ" />

                    <ExperienceBox number={"10+"} text1="TASARIM & YAZILIM" text2="ARACI BİLGİSİ" />

                    <ExperienceBox number={"7/24"} text1="ÖĞRENMEYE AÇIK" text2="VE ÜRETKEN" />

                </div>
            </div>
        </div >
    );
}
