import { Hono } from "hono";
import OpenAI from "openai";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { z } from "zod";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const openAiClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

// const generativeAi = new GoogleGenerativeAI(
//   process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY!,
// );

const app = new Hono().post(
  "/",
  clerkMiddleware(),
  zValidator(
    "json",
    z.object({
      income: z.number().optional(),
      savings: z.number().optional(),
      expenses: z.number().optional(),
    }),
  ),
  async (c) => {
    const auth = await getAuth(c);
    const values = c.req.valid("json");

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { income, expenses, savings } = values;

    const generalPrompt =
      "Provide simple and practical financial advise in 3 to 4 sentences to help manage finances better. Ensure the advise is actionable, encourages savings and is written in friendly, approachable tone.";
    const userPrompt = `
      Based on the following financial data:
      - Expenses: ${expenses} USD 
      - Incomes: ${income} USD
      - Savings: ${savings} USD
      ${generalPrompt}
    `;
    const isNewUser = income === 0 || expenses === 0 || savings === 0;

    const chatCompletion = await openAiClient.chat.completions.create({
      messages: [
        {
          role: "user",
          content: isNewUser ? generalPrompt : userPrompt,
        },
      ],
      model: "deepseek/deepseek-r1:free",
    });

    const advise = chatCompletion.choices[0].message?.content;

    // const model = generativeAi.getGenerativeModel({
    //   model: "gemini-1.5-flash",
    // });

    // const result = await model.generateContent(
    //   isNewUser ? generalPrompt : userPrompt,
    // );
    // const advise = result.response.text();

    return c.json({ data: advise });
  },
);

export default app;
