"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
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
} from "lucide-react";

interface CustomerFormProps {
  customer?: Customer | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface Customer {
  id: string;
  customerName: string;
  phone: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  aadharNumber?: string;
  panNumber?: string;
  bankName?: string;
  ifscCode?: string;
  accountNumber?: string;
  user: {
    email: string;
  };
}


interface CustomerFormData {
  customerName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  aadharNumber: string;
  panNumber: string;
  bankName: string;
  ifscCode?: string;
  accountNumber?: string;
}


const initialData: CustomerFormData = {
  customerName: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  aadharNumber: "",
  panNumber: "",
  bankName: "",
  ifscCode: "",
  accountNumber: "",
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

export default function CustomerForm({
  customer,
  onSuccess,
  onCancel,
}: CustomerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<CustomerFormData>(initialData);

  useEffect(() => {
    if (customer) {
      setForm({
        customerName: customer.customerName,
        email: customer.user.email,
        password: "",
        phone: customer.phone,
        gender: customer.gender ?? "",
        dateOfBirth: customer.dateOfBirth ?? "",
        address: customer.address ?? "",
        aadharNumber: customer.aadharNumber ?? "",
        panNumber: customer.panNumber ?? "",
        bankName: customer.bankName ?? "",
        ifscCode: customer.ifscCode ?? "",
        accountNumber: customer.accountNumber ?? "",
      });
    } else {
      setForm(initialData);
    }
  }, [customer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
     if (customer) {
    await api.put(`/api/v1/dealer/customers/${customer.id}`, {
        ...form,
    });
} else {
    await api.post("/api/v1/dealer/customer", {
        ...form,
    });
}

setForm(initialData);

if (onSuccess) {
  onSuccess();
} else {
  router.push("/dealer/customers");
}
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
      className="mx-auto max-w-7xl p-8"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
          </div>
          <h1 className="text-3xl font-bold font-serif">Create Customer</h1>
          <p className="mt-1 text-muted-foreground">
            Register a new customer account and profile
          </p>
        </div>
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
  <FieldCell label="Customer Name">
    <Input
      name="customerName"
      value={form.customerName}
      onChange={handleChange}
      placeholder="Customer Name"
      required
    />
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
  className="pl-9"
  value={form.password}
  onChange={handleChange}
  required={!customer} // Make password required only when creating a new customer
  placeholder={
       "Minimum 8 characters"
  }
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

        {/* Personal Information */}
        <SectionBox
  icon={<User className="h-5 w-5" />}
  iconBg="bg-blue-100"
  iconColor="text-blue-600"
  title="Personal Information"
  description="Customer personal details"
>
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
          </FieldRow>

           <SectionBox
  icon={<Landmark className="h-5 w-5" />}
  iconBg="bg-green-100"
  iconColor="text-green-600"
  title="Bank Details"
  description="Customer bank information"
>
           <FieldRow cols={2}>
  <FieldCell label="Bank Name">
    <Input
      name="bankName"
      value={form.bankName}
      onChange={handleChange}
    />
  </FieldCell>

  <FieldCell label="IFSC Code">
    <Input
      name="ifscCode"
      value={form.ifscCode}
      onChange={handleChange}
    />
  </FieldCell>
</FieldRow>

<FieldRow cols={1}>
  <FieldCell label="Account Number">
    <Input
      name="accountNumber"
      value={form.accountNumber}
      onChange={handleChange}
    />
  </FieldCell>
</FieldRow>
</SectionBox>

        </SectionBox>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
  type="button"
  variant="outline"
  onClick={() => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  }}
  disabled={loading}
  className="border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
>
  Cancel
</Button>


          <Button type="submit">
    {loading
        ? customer
            ? "Updating..."
            : "Creating..."
        : customer
            ? "Update Customer"
            : "Create Customer"}
</Button>

        </div>

      </form>
    </motion.div>
  );
}
