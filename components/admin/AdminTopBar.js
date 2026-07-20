"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminTopBar({ title }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/panel-selveo/login");
    router.refresh();
  }

  return (
    <div className="border-b border-gold/15 bg-cream-light">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <Link href="/panel-selveo" className="flex items-center gap-3">
          <Image src="/logo.png?v=2" alt="Selveo" width={40} height={40} className="h-9 w-auto" />
          <span className="font-serif text-lg text-charcoal">{title || "Panel Selveo"}</span>
        </Link>
        <button
          onClick={handleLogout}
          className="text-xs tracking-widest2 uppercase text-charcoal-light hover:text-charcoal transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
