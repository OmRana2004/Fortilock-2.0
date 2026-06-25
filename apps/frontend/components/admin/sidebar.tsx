"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Dealers",
    href: "/admin/dealers",
    icon: Users,
  },
  {
    title: "Subscriptions",
    href: "/admin/subscriptions",
    icon: CreditCard,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white p-6">
      {/* Logo */}
      <div className="mb-12 flex justify-center">
        <Image
          src="/logo.png"
          alt="FortiLock"
          width={170}
          height={70}
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex h-14 items-center gap-4 rounded-2xl px-5 text-base font-medium transition-all duration-200 ${
                active
                  ? "bg-linear-to-r from-indigo-600 to-violet-500 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={22} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="flex h-14 w-full items-center gap-4 rounded-2xl px-5 text-base font-medium text-red-500 transition-all duration-200 hover:bg-red-100 cursor-pointer"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}