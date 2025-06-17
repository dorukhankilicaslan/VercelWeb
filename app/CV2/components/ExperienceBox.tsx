// @/components/ExperienceBox.tsx

export default function PersonalInfo({
    number = "",
    text1 = "",
    text2 = "",
}) {
    return (
        <>
            <div className="w-full p-0">
                <div className="bg-[var(--background)] border-[var(--foreground)]/10 border-[1px] shadow-md) shadow-md rounded-lg p-6 text-center">
                    <h3 className="text-3xl md:text-5xl font-semibold relative font-[Poppins]">{number}</h3>
                    <p className="text-sm relative font-[Open_Sans] m-0 mt-4">
                        {text1}<span className="block">{text2}</span>
                    </p>
                </div>
            </div>
        </>
    );
}
