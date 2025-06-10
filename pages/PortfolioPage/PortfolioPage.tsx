import React from 'react';
import Gallery from '@/components/Gallery'; // Doğru yolu kontrol edin

const PortfolioPage: React.FC = () => {
    return (
        // Ana kapsayıcıya min-h-screen ve overflow-y-auto ekleyerek kaydırmayı sağlayın
        // 'relative' veya 'static' konumlandırmayı kullanın, 'absolute' değil
        <div className='relative min-h-screen bg-[var(--background)] overflow-y-auto mt-10'>
            <h1 className='isolate text-center grid place-items-center mb-10 md:mb-15'> {/* mb-15 yerine mb-10 kullanıldı */}
                <span className='col-start-1 row-start-1 text-9xl font-black text-[var(--passive)] z-0'>PORTFOLIO</span>
                <span className='col-start-1 row-start-1 mt-2 text-6xl font-black text-[var(--foreground)] z-1'>
                    ÇALIŞMALAR<span className='text-[var(--primary)]'>IM</span>
                </span>
            </h1>

            <div className='w-full max-w-7xl px-4 mx-auto'> {/* max-w-7xl Tailwind sınıfı */}
                <div className="col-span-full flex flex-col justify-start text-start">
                    <h2 className="text-4xl font-[Poppins] font-semibold text-[var(--foreground)] ml-10">
                        Axial
                        <span className='ml-5 text-xl font-normal opacity-80'>Firma adı ve temasıyla uyumlu yiyecek görselleri içeren broşür ve magnet tasarımı</span>

                    </h2>
                    <hr className="mt-4 border-t-4 border-[var(--foreground)] rounded-full" />
                </div>
                <Gallery />
            </div>

            <div className='w-full max-w-7xl px-4 mx-auto'> {/* max-w-7xl Tailwind sınıfı */}
                <div className="col-span-full flex flex-col justify-start text-start">
                    <h2 className="text-4xl font-[Poppins] font-semibold text-[var(--foreground)] ml-10">
                        Kanatçı Ezo
                        <span className='ml-5 text-xl font-normal opacity-80'>Firma adı ve temasıyla uyumlu yiyecek görselleri içeren broşür ve magnet tasarımı</span>
                    </h2>
                    <hr className="mt-4 border-t-4 border-[var(--foreground)] rounded-full" />
                </div>
                <Gallery />
            </div>

            <div className="h-20"></div> {/* En altta biraz boşluk bırakır */}
        </div>
    );
};

export default PortfolioPage;