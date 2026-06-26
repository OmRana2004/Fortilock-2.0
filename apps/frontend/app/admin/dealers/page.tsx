// import CreateDealerDialog from "@/components/admin/dealers/create-dealer-dialog";
// import DealerTable from "@/components/admin/dealers/dealer-table";

import DashboardStats from "@/components/admin/dashboard-stats";
import DealerTable from "@/components/admin/dealer-table";
import DealerForm from "@/components/admin/DealerForm";

export default function DealersPage() {
  return (
    <div className="">
<DashboardStats />
<div className="">
<DealerTable />
</div>
<DealerForm />
         </div> 
  )
}