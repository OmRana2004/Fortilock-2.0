"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/axios";
import { Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {Sheet, SheetContent} from "@/components/ui/sheet";

import DealerForm from "./DealerForm";

interface Dealer {
  id: string;
  userId: string;
  shopName: string;
  contactPerson: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  user: { email: string };
  
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function DealerTable() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchDealers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/v1/admin/dealers", {
        params: { page, limit: 10, search },
      });
      setDealers(data.dealers);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, [page, search]);

  const toggleStatus = async (dealer: Dealer) => {
    try {
      await api.patch(`/api/v1/admin/dealers/${dealer.id}/toggle-status`);
      setDealers((prev) =>
        prev.map((d) =>
          d.id === dealer.id ? { ...d, isActive: !d.isActive } : d,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // delete
  const handleDelete = async (dealer: Dealer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${dealer.shopName}"?`,
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/v1/admin/dealers/${dealer.id}`);

      // Refresh list
      fetchDealers();

      // OR update local state (see below)
    } catch (error) {
      console.error(error);
      alert("Failed to delete dealer");
    }
  };

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-gray-50 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dealers</h2>
        </div>
      </div>

      {/* Controls Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-b-sm border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
   onClick={() => {
    setSelectedDealer(null);
    setOpen(true);
  }}
  className="bg-violet-500 hover:bg-violet-700 text-white px-2 cursor-pointer"
>
  Add Dealer
</Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-slate-100 shadow-xs">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-gray-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="w-12 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-black text-sm">Dealer ID</th>
              <th className="px-6 py-3 text-left text-black text-sm">Dealer Name</th>
              <th className="px-6 py-3 text-left text-black text-sm">Contact Person</th>
              <th className="px-6 py-3 text-left text-black text-sm">Mobile Number</th>
              <th className="px-6 py-3 text-center w-52 text-black text-sm">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 rounded-lg bg-slate-100" />
                    </td>
                  ))}
                </tr>
              ))
            ) : dealers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-16 text-center text-slate-400"
                >
                  <p className="text-base font-medium">No dealers found</p>
                  <p className="mt-1 text-sm">
                    Try adjusting your search query.
                  </p>
                </td>
              </tr>
            ) : (
              dealers.map((dealer) => (
                <tr
                  key={dealer.id}
                  className="group transition-colors hover:bg-slate-50/40"
                >
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                    />
                  </td>

                 <td className="px-6 py-4">
  <button
    onClick={() => {
      setSelectedDealer(dealer);
      setOpen(true);
    }}
    className="font-medium text-blue-600 hover:underline cursor-pointer"
  >
    {`DL${dealer.id.slice(0, 6).toUpperCase()}`}
  </button>
</td>

                  <td className="px-6 py-4 font-medium text-slate-600 capitalize">
                    {dealer.shopName}
                  </td>
                  <td className="px-14 py-4 text-left font-medium text-slate-600 capitalize">
                    {dealer.contactPerson}
                  </td>
                  <td className="px-8 py-4 text-slate-500 font-medium">{dealer.phone}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 cursor-pointer hover:bg-accent transition shadow-accent">
                        <span className="block h-6 w-6 leading-none text-center text-xl">
                          📝
                        </span>
                      </button>

                      <button
                        onClick={() => handleDelete(dealer)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-lg p-1 ml-1">
                        <Badge
                          className={`shadow-none font-bold rounded px-2.5 py-0.5 border-none transition-colors ${
                            dealer.isActive
                              ? " bg-emerald-600 hover:bg-emerald-600 text-amber-50"
                              : "bg-slate-300 hover:bg-slate-300 text-slate-600"
                          }`}
                        >
                          {dealer.isActive ? "ACTIVE" : "INACTIVE"}
                        </Badge>
                        <Switch
                          checked={dealer.isActive}
                          onCheckedChange={() => toggleStatus(dealer)}
                          className="data-[state=checked]:bg-emerald-500 scale-100 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-sm text-slate-500">
        <div>
          Showing {dealers.length === 0 ? 0 : (page - 1) * 10 + 1} to{" "}
          {Math.min(page * 10, pagination.total)} of {pagination.total} entries
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md text-slate-400"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button className="h-8 w-8 bg-black hover:bg-black text-white font-semibold rounded-md text-xs">
            {page}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md text-slate-400"
            disabled={page >= pagination.totalPages}
            onClick={() =>
              setPage((p) => Math.min(p + 1, pagination.totalPages))
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
  <SheetContent
    side="right"
    fullScreen
    className="overflow-y-auto p-0"
  >
   <DealerForm
    dealer={selectedDealer}
    onSuccess={() => {
        setOpen(false);
        setSelectedDealer(null);
        fetchDealers();
    }}
    onCancel={() => {
        setOpen(false);
        setSelectedDealer(null);
    }}
/>
  </SheetContent>
</Sheet>
    </div>
    
  );
}
