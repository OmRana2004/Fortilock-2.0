import CustomerHeader from "@/components/dealer/customer-header";
import CustomerTabs from "@/components/dealer/customer-tabs";

export default function CustomerProfilePage() {
  return (
    <div className="space-y-6">
      <CustomerHeader />

      <CustomerTabs />
    </div>
  );
}