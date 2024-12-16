"use client";

import { useGetAdvice } from "@/features/advice/api/use-get-advice";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LiaReact } from "react-icons/lia";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { Skeleton } from "./ui/skeleton";

const FinancialAdvice = () => {
  const { data, isLoading: isLoadingSummary } = useGetSummary();
  const savings = data?.remainingAmount;
  const income = data?.incomeAmount;
  const expenses = data?.expensesAmount;

  const { data: advise, isLoading: isLoadingAdvise } = useGetAdvice(
    income,
    expenses,
    savings,
  );

  const isLoading = isLoadingAdvise || isLoadingSummary;

  return (
    <div className="my-4">
      <Card className="font-normal bg-white/10 border-none outline-none text-white">
        <CardHeader className="flex flex-row gap-x-2">
          <CardTitle className="text-lg font-medium">FinTrack AI</CardTitle>
          <LiaReact className="animate-spin-slow" size={20} />
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col gap-y-4">
              <Skeleton className="h-6 w-full bg-gradient-to-l" />
              <Skeleton className="h-6 w-24 bg-gradient-to-l" />
            </div>
          )}
          <p>{advise}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAdvice;
