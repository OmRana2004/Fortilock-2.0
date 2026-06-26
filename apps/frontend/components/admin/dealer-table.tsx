"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Search, Pencil, Trash2, Power } from "lucide-react";

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
  const [page, setPage] = useState(1);
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
        d.id === dealer.id ? { ...d, isActive: !d.isActive } : d
      )
    );
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-200 bg-linear-to-r from-violet-50 via-white to-indigo-50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dealers</h2>
          <p className="mt-1 text-sm text-slate-500">Manage all registered dealers</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 px-5 py-3 text-center">
            <p className="text-xs font-medium text-violet-600">Total Dealers</p>
            <p className="text-2xl font-bold text-violet-700">{pagination.total}</p>
          </div>
          <button className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-95">
            + Add Dealer
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search by shop, contact, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-6 py-3 text-left">Shop</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
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
                <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                  <p className="text-base font-medium">No dealers found</p>
                  <p className="mt-1 text-sm">Try adjusting your search query.</p>
                </td>
              </tr>
            ) : (
              dealers.map((dealer) => (
                <tr
                  key={dealer.id}
                  className="group transition-colors hover:bg-violet-50/40"
                >
                  {/* Shop */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white shadow-sm">
                        {dealer.shopName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{dealer.shopName}</p>
                        <p className="text-xs text-slate-400">#{dealer.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 text-slate-600">{dealer.contactPerson}</td>

                  {/* Email */}
                  <td className="px-6 py-4 text-slate-600">{dealer.user.email}</td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-slate-600">{dealer.phone}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        dealer.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          dealer.isActive ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                      {dealer.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        title="Edit"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-100 hover:text-violet-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                     <button
  title={dealer.isActive ? "Deactivate" : "Activate"}
  onClick={() => toggleStatus(dealer)}
  className={`rounded-lg p-2 transition ${
    dealer.isActive
      ? "text-slate-400 hover:bg-rose-100 hover:text-rose-600"
      : "text-slate-400 hover:bg-emerald-100 hover:text-emerald-600"
  }`}
>
  <Power className="h-4 w-4" />
</button>

                      <button
                        title="Delete"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-100 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/60 px-6 py-4 md:flex-row">
        <p className="text-sm text-slate-500">
          Page{" "}
          <span className="font-semibold text-slate-700">{pagination.page}</span>
          {" "}of{" "}
          <span className="font-semibold text-slate-700">{pagination.totalPages}</span>
          {" "}·{" "}
          <span className="font-semibold text-slate-700">{pagination.total}</span> total
        </p>

        <div className="flex items-center gap-1.5">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                page === i + 1
                  ? "bg-violet-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
