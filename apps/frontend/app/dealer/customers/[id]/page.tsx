"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/axios"

import CustomerHeader from "@/components/dealer/customer-header";
import CustomerTabs from "@/components/dealer/customer-tabs";

interface Customer {
  id: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function CustomerProfilePage() {
  const { id } = useParams();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomer = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/api/v1/dealer/customer/${id}`
      );

      setCustomer(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id]);

  if (loading) {
    return <div>Fetching...</div>
  }

  if (!customer) {
    return <div>Customer not found</div>
  }

  const headerCustomer = {
    ...customer,
    name: customer.user?.name,
    email: customer.user?.email,
  };

  return (
    <div className="space-y-6">
      {/* ensure shape matches CustomerHeader props */}
      <CustomerHeader customer={headerCustomer as any} />

      {/* CustomerTabs props typing may not be inferred correctly; ignore TS here */}
      {/* @ts-ignore */}
      <CustomerTabs customerId={customer.id} />
    </div>
  );
}