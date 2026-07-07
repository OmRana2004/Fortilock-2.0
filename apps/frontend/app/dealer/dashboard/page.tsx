import DashboardHeader from "@/components/dealer/dashboard-header";
import DashboardStats from "@/components/dealer/dashboard-stats";
import RevenueChart from "@/components/admin/revenue-chart";
import SubscriptionChart from "@/components/admin/subscription-chart";


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart totalRevenue={190000} />
        </div>

        <SubscriptionChart activeSubscriptions={1} />
      </div>

     
    </div>
  );
}