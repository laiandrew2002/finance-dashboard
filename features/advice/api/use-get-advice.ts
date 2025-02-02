import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAdvice = (
  totalIncome?: number,
  totalExpenses?: number,
  totalSavings?: number,
) => {
  const query = useQuery({
    queryKey: ["advice"],
    queryFn: async () => {
      const response = await client.api["financial-advise"].$post({
        json: {
          income: totalIncome,
          expenses: totalExpenses,
          savings: totalSavings,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch advice");
      }

      const { data } = await response?.json();

      return data;
    },
    enabled:
      totalIncome !== undefined &&
      totalExpenses !== undefined &&
      totalSavings !== undefined,
    staleTime: 1000 * 60 * 60,
    gcTime: 2 * 60 * 60 * 1000,
  });

  return query;
};
