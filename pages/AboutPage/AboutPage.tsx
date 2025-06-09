// pages/AboutPage/AboutPage.tsx
"use client"; // Bu bileşen istemci tarafında çalışmalıdır

export default function AboutPage() {
    return (
        <div className="page-content-wrapper" style={{
            padding: '0',
            textAlign: 'center',
            backgroundColor: 'transparent', // Animasyonun arka planı kontrol etmesine izin ver
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw', // Tüm görüntü alanı genişliğini kapla
            height: '100vh', // Tüm görüntü alanı yüksekliğini kapla
            position: 'relative', // Çocukların mutlak konumlandırılması için önemli
            overflow: 'hidden', // Animasyon veya içerikten taşmaları gizle
            zIndex: 1 // İçeriğin arka plan animasyonunun üzerinde olmasını sağla
        }}>
        </div>
    );
};