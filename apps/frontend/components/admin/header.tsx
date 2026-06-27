"use client";

import Image from "next/image";

interface HeaderProps {
  title: string;
}

export default function Header({
  title,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between rounded-b-3xl border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
      </div>

      {/* Right */}
      <button className="overflow-hidden rounded-full ring-2 ring-slate-100 transition hover:ring-blue-100">
        <Image
          src="/avatar.png"
          alt="Profile"
          width={48}
          height={48}
          className="h-12 w-12 object-cover"
        />
      </button>
    </header>
  );
}