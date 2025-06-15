"use client";

import { useEffect, useState } from "react";

interface TransitionOverlayProps {
  show: boolean;
}

const BOX_COUNT = 4;
const ANIM_DURATION = 400; // animasyon süresi (ms)
const TOTAL_DURATION = 1000; // toplam süre (mount+unmount)
const DELAY_BETWEEN = 100; // kutular arası delay (ms)

export default function TransitionOverlay({ show }: TransitionOverlayProps) {
  // Her kutu için görünürlük ve pozisyon state'i tutalım
  const [boxes, setBoxes] = useState(
    Array(BOX_COUNT).fill({ visible: false, position: -400 })
  );

  useEffect(() => {
    if (show) {
      // show true olduğunda, her kutu için sıralı animasyon başlat
      for (let i = 0; i < BOX_COUNT; i++) {
        // delay ile mount (görünür + aşağı kaydır)
        setTimeout(() => {
          setBoxes((prev) => {
            const copy = [...prev];
            copy[i] = { visible: true, position: -400 };
            return copy;
          });
          // pozisyonu değiştir (aşağı kaydır)
          setTimeout(() => {
            setBoxes((prev) => {
              const copy = [...prev];
              copy[i] = { visible: true, position: window.innerHeight };
              return copy;
            });
          }, 20);
        }, i * DELAY_BETWEEN);

        // delay + animasyon + gizlenme için unmount
        setTimeout(() => {
          setBoxes((prev) => {
            const copy = [...prev];
            copy[i] = { visible: false, position: -400 };
            return copy;
          });
        }, i * DELAY_BETWEEN + TOTAL_DURATION);
      }
    } else {
      // show false ise hemen gizle tüm kutuları
      setBoxes(Array(BOX_COUNT).fill({ visible: false, position: -400 }));
    }
  }, [show]);

  return (
    <>
      {boxes.map((box, idx) =>
        box.visible ? (
          <div
            key={idx}
            style={{
              position: "fixed",
              top: box.position,
              left: 0,
              width: "100vw",
              height: 400,
              backgroundColor: ["#222", "#444", "#222", "#444"][idx], // farklı renkler
              transition: `top ${ANIM_DURATION}ms linear`,
              zIndex: 1000 + idx,
            }}
          />
        ) : null
      )}
    </>
  );
}
