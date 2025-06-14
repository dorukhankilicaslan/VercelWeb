// @/app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div
      className="p-10 h-screen w-screen
    flex flex-col justify-center items-center 
    bg-[var(--background)]/80"
    >
      <div
        className="bg-[var(--background)] dark:bg[var(--foreground)] w-100 p-8 rounded-xl shadow-xl 
      flex flex-col justify-center items-center"
      >
        <h1
          className="text-2xl text-[var(--background)] dark:text-[var(--foreground)] font-bold 
        mb-4"
        >
          Giriş Yap
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
