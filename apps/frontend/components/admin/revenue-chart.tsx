"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  totalRevenue: number;
}

const revenueData = [
  { month: "Jan", revenue: 18000 },
  { month: "Feb", revenue: 24000 },
  { month: "Mar", revenue: 31000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 56000 },
  { month: "Jun", revenue: 70000 },
  { month: "Jul", revenue: 86000 },
  { month: "Aug", revenue: 99000 },
  { month: "Sep", revenue: 115000 },
  { month: "Oct", revenue: 138000 },
  { month: "Nov", revenue: 162000 },
  { month: "Dec", revenue: 190000 },
];

export default function RevenueChart({
  totalRevenue,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Revenue Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly revenue overview
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Total Revenue
          </p>

          <h3 className="text-3xl font-bold text-slate-900">
            ₹
            <CountUp
              end={totalRevenue}
              separator=","
              duration={2}
            />
          </h3>

          <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
            ↑ 18.4%
          </span>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient
              id="revenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3B82F6"
                stopOpacity={0.45}
              />

              <stop
                offset="100%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "none",
              boxShadow:
                "0 20px 50px rgba(0,0,0,.08)",
            }}
          />

          <Area
            animationDuration={1800}
            type="monotone"
            dataKey="revenue"
            stroke="#2563EB"
            strokeWidth={4}
            fill="url(#revenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}