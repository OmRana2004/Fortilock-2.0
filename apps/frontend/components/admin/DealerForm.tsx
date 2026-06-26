"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/axios";

import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Landmark,
  FileText,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";

interface DealerFormData {
  shopName: string;
  contactPerson: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  yearOfEstablishment: string;
  address: string;
  aadharNumber: string;
  panNumber: string;
  gstNumber: string;
}

const initialData: DealerFormData = {
  shopName: "",
  contactPerson: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  yearOfEstablishment: "",
  address: "",
  aadharNumber: "",
  panNumber: "",
  gstNumber: "",
};

export default function DealerForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] =
    useState<DealerFormData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/api/v1/admin/dealers",
        {
          ...form,
          yearOfEstablishment:
            Number(form.yearOfEstablishment),
        }
      );

      alert("Dealer Created Successfully");

      router.push("/admin/delears");
    } catch (err: any) {
      alert(
        err?.response?.data?.message ??
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="mx-auto max-w-7xl p-8"
    >
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Create Dealer
          </h1>

          <p className="mt-2 text-slate-500">
            Register a new dealer account
          </p>

        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* ACCOUNT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="rounded-3xl border bg-white p-8 shadow-sm"
        >

          <div className="mb-8 flex items-center gap-3">

            <div className="rounded-xl bg-violet-100 p-3">

              <User className="text-violet-600" />

            </div>

            <div>

              <h2 className="text-xl font-bold">
                Account Information
              </h2>

              <p className="text-sm text-slate-500">
                Login credentials
              </p>

            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Contact Person
              </label>

              <div className="relative">

                <User className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-violet-500"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <div className="relative">

                <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-violet-500"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  required
                  onChange={handleChange}
                  className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none focus:border-violet-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-4"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <div className="relative">

                <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-violet-500"
                />

              </div>

            </div>

          </div>

        </motion.div>

                {/* SHOP INFORMATION */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border bg-white p-8 shadow-sm"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3">
              <Building2 className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Shop Information
              </h2>

              <p className="text-sm text-slate-500">
                Dealer business details
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Shop Name
              </label>

              <div className="relative">
                <Building2 className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  name="shopName"
                  value={form.shopName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Gender
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
              >
                <option value="">
                  Select Gender
                </option>

                <option value="MALE">
                  Male
                </option>

                <option value="FEMALE">
                  Female
                </option>

                <option value="OTHER">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Date of Birth
              </label>

              <div className="relative">
                <Calendar className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Year of Establishment
              </label>

              <input
                type="number"
                name="yearOfEstablishment"
                value={form.yearOfEstablishment}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-violet-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Address
              </label>

              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <textarea
                  rows={4}
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-violet-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* GOVERNMENT DETAILS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border bg-white p-8 shadow-sm"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3">
              <Landmark className="text-green-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Government Details
              </h2>

              <p className="text-sm text-slate-500">
                Identity & Tax information
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Aadhar Number
              </label>

              <div className="relative">
                <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  name="aadharNumber"
                  value={form.aadharNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                PAN Number
              </label>

              <div className="relative">
                <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  name="panNumber"
                  value={form.panNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                GST Number
              </label>

              <div className="relative">
                <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                <input
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-violet-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 font-medium text-white shadow-lg transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {loading
              ? "Creating..."
              : "Create Dealer"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}