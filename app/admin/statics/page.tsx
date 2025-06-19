"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function StaticsPage() {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // her render veya pathname değişiminde fetch et
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("your_table_name") // örnek tablo adı
        .select("*");

      if (error) {
        console.error("Veri çekme hatası:", error.message);
      } else {
        setData(data ?? []);
      }

      setLoading(false);
    };

    fetchData();
  }, [pathname]); // pathname her değiştiğinde veri yeniden çekilir

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">İstatistikler</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <pre className="text-sm bg-[var(--active-bg)] p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
