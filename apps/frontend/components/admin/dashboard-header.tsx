"use client";

import { useAuthStore } from "@/store/auth.store";

export default function DashboardHeader() {
  const user = useAuthStore(
    (state) => state.user
  );

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-slate-900">
        {greeting},{" "}
        <span className="text-indigo-600">
          {user?.name}
        </span>
        !
      </h1>

      <p className="mt-2 text-lg text-slate-500">
        An overview of your dealers,
        subscriptions and revenue.
      </p>
    </div>
  );
}