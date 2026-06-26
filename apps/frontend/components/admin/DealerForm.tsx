"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  Loader2,
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

function SectionBox({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-4">
        <div className={`rounded-xl ${iconBg} p-2.5`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <div>
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>

      {/* Grid Table Body */}
      <div className="divide-y divide-slate-100">
        {children}
      </div>
    </motion.div>
  );
}

function FieldRow({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={`grid divide-x divide-slate-100 ${cols === 2 ? "grid-cols-1 md:grid-cols-2" : cols === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"}`}>
      {children}
    </div>
  );
}

function FieldCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 px-6 py-4">
      <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function DealerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<DealerFormData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/api/v1/admin/dealers", {
        ...form,
        yearOfEstablishment: Number(form.yearOfEstablishment),
      });
      alert("Dealer Created Successfully");
      router.push("/admin/dealers");
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-5xl p-6 md:p-10"
    >
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="secondary" className="bg-violet-100 text-violet-600">
              Admin
            </Badge>
            <span className="text-sm text-muted-foreground">/ Dealers / New</span>
          </div>
          <h1 className="text-3xl font-bold font-serif">Create Dealer</h1>
          <p className="mt-1 text-muted-foreground">
            Register a new dealer account and shop profile
          </p>
        </div>

        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Account Information */}
        <SectionBox
          icon={<User className="h-5 w-5" />}
          iconBg="bg-violet-100"
          iconColor="text-violet-600"
          title="Account Information"
          description="Login credentials for the dealer"
        >
          <FieldRow cols={2}>
            <FieldCell label="Contact Person">
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="contactPerson"
                  placeholder="Full name"
                  value={form.contactPerson}
                  onChange={handleChange}
                  required
                  className="pl-9"
                />
              </div>
            </FieldCell>

            <FieldCell label="Email">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  name="email"
                  placeholder="dealer@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-9"
                />
              </div>
            </FieldCell>
          </FieldRow>

          <FieldRow cols={2}>
            <FieldCell label="Password">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </FieldCell>

            <FieldCell label="Phone">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="phone"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="pl-9"
                />
              </div>
            </FieldCell>
          </FieldRow>
        </SectionBox>

        {/* Shop Information */}
        <SectionBox
          icon={<Building2 className="h-5 w-5" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          title="Shop Information"
          description="Dealer business and personal details"
        >
          <FieldRow cols={2}>
            <FieldCell label="Shop Name">
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="shopName"
                  placeholder="Shop or business name"
                  value={form.shopName}
                  onChange={handleChange}
                  required
                  className="pl-9"
                />
              </div>
            </FieldCell>

            <FieldCell label="Gender">
              <Select
                value={form.gender}
                onValueChange={(val) => setForm({ ...form, gender: val })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </FieldCell>
          </FieldRow>

          <FieldRow cols={2}>
            <FieldCell label="Date of Birth">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
            </FieldCell>

            <FieldCell label="Year of Establishment">
              <Input
                type="number"
                name="yearOfEstablishment"
                placeholder="e.g. 2010"
                value={form.yearOfEstablishment}
                onChange={handleChange}
                required
                min={1900}
                max={new Date().getFullYear()}
              />
            </FieldCell>
          </FieldRow>

          <FieldRow cols={1}>
            <FieldCell label="Address">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Textarea
                  name="address"
                  rows={3}
                  placeholder="Full business address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="resize-none pl-9"
                />
              </div>
            </FieldCell>
          </FieldRow>
        </SectionBox>

        {/* Government Details */}
        <SectionBox
          icon={<Landmark className="h-5 w-5" />}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          title="Government Details"
          description="Identity and tax information"
        >
          <FieldRow cols={3}>
            <FieldCell label="Aadhar Number">
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="aadharNumber"
                  placeholder="XXXX XXXX XXXX"
                  value={form.aadharNumber}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
            </FieldCell>

            <FieldCell label="PAN Number">
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="panNumber"
                  placeholder="ABCDE1234F"
                  value={form.panNumber}
                  onChange={handleChange}
                  className="pl-9 uppercase"
                />
              </div>
            </FieldCell>

            <FieldCell label="GST Number">
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="gstNumber"
                  placeholder="22ABCDE1234F1Z5"
                  value={form.gstNumber}
                  onChange={handleChange}
                  className="pl-9 uppercase"
                />
              </div>
            </FieldCell>
          </FieldRow>
        </SectionBox>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="min-w-36 gap-2 bg-violet-600 text-white hover:bg-violet-700"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save size={16} />
                Create Dealer
              </>
            )}
          </Button>
        </div>

      </form>
    </motion.div>
  );
}
