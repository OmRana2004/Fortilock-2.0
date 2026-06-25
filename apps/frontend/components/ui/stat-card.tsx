"use client";

import { LucideIcon, MoreHorizontal } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;

  icon: LucideIcon;

  iconBg?: string;
  iconColor?: string;

  onMoreClick?: () => void;
}

export default function StatCard({
  title,
  value,
  subtitle,

  icon: Icon,

  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",

  onMoreClick,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-8 flex items-start justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon
            size={30}
            className={iconColor}
          />
        </div>

        <button
          onClick={onMoreClick}
          className="text-slate-400 transition hover:text-slate-600"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <h2 className="text-4xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-lg font-medium text-slate-600">
        {title}
      </p>

      {subtitle && (
        <p className="mt-4 text-sm text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}