"use client";

import { useEffect, useState } from "react";
import {
  IndianRupee,
  Users,
  UserCheck,
  UserX,
  CreditCard,
} from "lucide-react";

import StatCard from "../ui/stat-card";
import { api } from "@/lib/axios";

interface DashboardStats {
  totalRevenue: number;
  totalDealers: number;
  activeDealers: number;
  inactiveDealers: number;
  activeSubscriptions: number;
}

export default function DashboardStats() {
  const [stats, setStats] =
    useState<DashboardStats>({
      totalRevenue: 0,
      totalDealers: 0,
      activeDealers: 0,
      inactiveDealers: 0,
      activeSubscriptions: 0,
    });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get<DashboardStats>(
          "/api/v1/admin/dashboard"
        );

        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Total Revenue"
        value={"1.9Lakh"}
        subtitle="Revenue collected"
        icon={IndianRupee}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />

      <StatCard
        title="Total Dealers"
        value={stats.totalDealers}
        subtitle="Registered dealers"
        icon={Users}
        iconBg="bg-violet-50"
        iconColor="text-violet-600"
      />

      <StatCard
        title="Active Dealers"
        value={stats.activeDealers}
        subtitle="Currently active"
        icon={UserCheck}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />

      <StatCard
        title="Inactive Dealers"
        value={stats.inactiveDealers}
        subtitle="Need attention"
        icon={UserX}
        iconBg="bg-red-50"
        iconColor="text-red-600"
      />

      <StatCard
        title="Active Subscriptions"
        value={stats.activeSubscriptions}
        subtitle="Running plans"
        icon={CreditCard}
        iconBg="bg-orange-50"
        iconColor="text-orange-600"
      />
    </div>
  );
}