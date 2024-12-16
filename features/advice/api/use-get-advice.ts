import { useQuery } from "@tanstack/react-query";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generativeAi = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY!,
);

// Function to generate personalized financial advice
const getFinancialAdvice = async (
  totalIncome?: number,
  totalSpend?: number,
  totalSavings?: number,
) => {
  try {
    const generalPrompt =
      "Provide simple and practical financial advise in 3 to 4 sentences to help manage finances better. Ensure the advise is actionable, encourages savings and is written in friendly, approachable tone.";
    const userPrompt = `
      Based on the following financial data:
      - Expenses: ${totalSpend} USD 
      - Incomes: ${totalIncome} USD
      - Savings: ${totalSavings} USD
      ${generalPrompt}
    `;
    const isNewUser =
      totalIncome === 0 || totalSpend === 0 || totalSavings === 0;

    const model = generativeAi.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      isNewUser ? generalPrompt : userPrompt,
    );

    const advise = result.response.text();

    return advise;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export const useGetAdvice = (
  totalIncome?: number,
  totalExpenses?: number,
  totalSavings?: number,
) => {
  const query = useQuery({
    queryKey: ["advice"],
    queryFn: async () => {
      const advice = await getFinancialAdvice(
        totalIncome,
        totalExpenses,
        totalSavings,
      );
      return advice;
    },
    enabled:
      totalIncome !== undefined &&
      totalExpenses !== undefined &&
      totalSavings !== undefined,
    staleTime: 1000 * 60 * 60,
  });

  return query;
};
