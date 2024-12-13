import { Suspense } from "react";
import { AccountFilter } from "./AccountFilter";
import { DateFilter } from "./DateFilter";
import { Loader2 } from "lucide-react";

export const Filters = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
      <Suspense fallback={<Loader2 className="size-8 animate-spin text-slate-400"/>}>
        <AccountFilter />
        <DateFilter />
      </Suspense>
    </div>
  );
};