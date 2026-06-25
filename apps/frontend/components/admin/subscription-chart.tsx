"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  activeSubscriptions: number;
}

const data = [
  {
    name: "Monthly",
    value: 42,
    color: "#2563EB",
  },
  {
    name: "Quarterly",
    value: 24,
    color: "#7C3AED",
  },
  {
    name: "Half-Yearly",
    value: 18,
    color: "#10B981",
  },
  {
    name: "Yearly",
    value: 16,
    color: "#F59E0B",
  },
];

export default function SubscriptionChart({
  activeSubscriptions,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Subscription Plans
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Active plan distribution
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Active Plans
          </p>

          <h3 className="text-3xl font-bold text-slate-900">
            <CountUp
              end={activeSubscriptions}
              duration={2}
            />
          </h3>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={340}
      >
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            dataKey="value"
            animationDuration={1800}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.color}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              border: "none",
              borderRadius: 16,
              boxShadow:
                "0 12px 35px rgba(0,0,0,.08)",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((plan) => (
          <div
            key={plan.name}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  background: plan.color,
                }}
              />

              <span className="font-medium text-slate-700">
                {plan.name}
              </span>
            </div>

            <span className="font-bold">
              {plan.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}