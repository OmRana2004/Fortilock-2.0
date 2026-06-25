"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

import {
  Search,
  Pencil,
  Trash2,
  Power,
} from "lucide-react";

interface Dealer {
  id: string;
  userId: string;

  shopName: string;
  contactPerson: string;

  phone: string;

  isActive: boolean;

  createdAt: string;

  user: {
    email: string;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function DealerTable() {
  const [dealers, setDealers] = useState<Dealer[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState<Pagination>({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    });

  const fetchDealers = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        "/api/v1/admin/dealers",
        {
          params: {
            page,
            limit: 10,
            search,
          },
        }
      );

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

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <div>

          <h2 className="text-xl font-bold">
            Dealer List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total Dealers : {pagination.total}
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="border-b border-slate-200 p-6">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search dealer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-violet-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Shop
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Contact
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-500"
                >
                  Loading dealers...
                </td>

              </tr>

            ) : dealers.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-500"
                >
                  No dealers found.
                </td>

              </tr>

            ) : (

              dealers.map((dealer) => (

                <tr
                  key={dealer.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-5 font-medium">
                    {dealer.shopName}
                  </td>

                  <td className="px-6 py-5">
                    {dealer.contactPerson}
                  </td>

                  <td className="px-6 py-5">
                    {dealer.user.email}
                  </td>

                  <td className="px-6 py-5">
                    {dealer.phone}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        dealer.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dealer.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200">
                        <Pencil size={16} />
                      </button>

                      <button className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200">
                        <Trash2 size={16} />
                      </button>

                      <button
                        className={`rounded-lg p-2 transition ${
                          dealer.isActive
                            ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        <Power size={16} />
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

      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-6 py-5 md:flex-row">
        <p className="text-sm text-slate-500">
          Showing page{" "}
          <span className="font-semibold">
            {pagination.page}
          </span>{" "}
          of{" "}
          <span className="font-semibold">
            {pagination.totalPages}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from(
            { length: pagination.totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                  page === index + 1
                    ? "bg-violet-600 text-white"
                    : "border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}