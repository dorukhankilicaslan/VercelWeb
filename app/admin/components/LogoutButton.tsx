"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    } else {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer hover:text-[var(--primary)] rounded"
    >
      Çıkış Yap
    </button>
  );
}
