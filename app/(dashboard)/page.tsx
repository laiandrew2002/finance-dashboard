import { DataCharts } from "@/components/DataCharts";
import { DataGrid } from "@/components/DataGrid";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Suspense fallback={<Loader2 className="size-8 animate-spin text-slate-400"/>} >
        <DataGrid />
        <DataCharts />
      </Suspense>
    </div>
  );
}
