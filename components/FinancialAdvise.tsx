"use client";

import ReactMarkdown from "react-markdown";
import { useGetAdvice } from "@/features/advice/api/use-get-advice";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LiaReact } from "react-icons/lia";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const Advice = () => {
  const { data, isLoading: isLoadingSummary } = useGetSummary();
  const savings = data?.remainingAmount;
  const income = data?.incomeAmount;
  const expenses = data?.expensesAmount;

  const {
    data: advise,
    isLoading: isLoadingAdvise,
    isError,
    refetch,
  } = useGetAdvice(income, expenses, savings);

  const isLoading = isLoadingAdvise || isLoadingSummary;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-4">
        <Skeleton className="h-6 w-full bg-gradient-to-l" />
        <Skeleton className="h-6 w-full bg-gradient-to-l" />
        <Skeleton className="h-6 w-1/2 bg-gradient-to-l" />
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="flex flex-col gap-y-4">
        <p className="text-red-300">
          Unable to fetch financial advice at the moment. Please try again.
        </p>
        <Button onClick={() => refetch()} className="w-full" size="sm">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <>
      <ReactMarkdown>{advise}</ReactMarkdown>
    </>
  );
};

const FinancialAdvice = () => {
  return (
    <div className="my-4">
      <Card className="font-normal bg-white/10 border-none outline-none text-white">
        <CardHeader className="flex flex-row gap-x-2">
          <CardTitle className="text-lg font-medium">FinTrack AI</CardTitle>
          <LiaReact className="animate-spin-slow" size={20} />
        </CardHeader>
        <CardContent>
          <Advice />
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAdvice;
