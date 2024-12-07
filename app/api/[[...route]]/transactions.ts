import { Hono } from 'hono';
import { db } from '@/db/drizzle';
import { parse, subDays } from 'date-fns';
import {
  accounts,
  categories,
  transactions,
  insertTransactionsSchema,
} from '@/db/schema';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { and, eq, gte, inArray, lte, desc, sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { z } from 'zod';

const app = new Hono()
  .get(
    '/',
    clerkMiddleware(),
    zValidator('query', z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional(),
    })),
    async (c) => {
      const auth = await getAuth(c);
      const { from, to, accountId } = c.req.valid('query');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const defaultFrom = subDays(new Date(), 30);
      const defaultTo = new Date();
      const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
      const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

      const data = await db.select({
        id: transactions.id,
        category: categories.name,
        categoryId: transactions.categoryId,
        payee: transactions.payee,
        amount: transactions.amount,
        notes: transactions.notes,
        account: accounts.name,
        accountId: transactions.accountId,
        date: transactions.date,
      })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
          and(
            accountId ? eq(transactions.accountId, accountId) : undefined,
            eq(accounts.userId, auth.userId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate),
          ),
        ).orderBy(desc(transactions.date));

      return c.json({ data });
    }
  )
  .get(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = await getAuth(c);
      const { id } = c.req.valid('param');

      if(!id) {
        return c.json({ error: 'Missing id' }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .select({
          id: transactions.id,
          categoryId: transactions.categoryId,
          payee: transactions.payee,
          amount: transactions.amount,
          notes: transactions.notes,
          accountId: transactions.accountId,
          date: transactions.date,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .where(
          and(
            eq(transactions.id, id),
            eq(accounts.userId, auth.userId),
          ),
        );
      
      if (!data) {
        return c.json({ error: 'Transaction not found' }, 404);
      }

      return c.json({ data });
  })
  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertTransactionsSchema.omit({ id: true })),
    async (c) => {
      const auth = await getAuth(c);
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .insert(transactions)
        .values({
          id: createId(),
          ...values,
        }).returning();

      return c.json({ data });
    }
  )
  .post(
    "bulk-delete",
    clerkMiddleware(),
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const auth = await getAuth(c);
      const ids = c.req.valid("json").ids;

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const transactionsToDelete = await db.$with("transactions_to").as(
        db.select({ id: transactions.id }).from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(
            inArray(transactions.id, ids),
            eq(accounts.userId, auth.userId),
          ))
      );

      const data = await db
        .with(transactionsToDelete)
        .delete(transactions)
        .where(
          inArray(transactions.id, sql`(select id from ${transactionsToDelete})`),
        ).returning({ id: transactions.id });


      return c.json({ data });
    }
  )
  .patch(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    zValidator('json', insertTransactionsSchema.omit({ id: true })),
    async (c) => {
      const auth = await getAuth(c);
      const { id } = c.req.valid('param');
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      if (!id) {
        return c.json({ error: 'Missing id' }, 400);
      }

      const transactionToUpdate = await db.$with("transactions_to").as(
        db.select({ id: transactions.id }).from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(
            eq(transactions.id, id),
            eq(accounts.userId, auth.userId),
          ))
      );

      const [data] = await db
        .with(transactionToUpdate)
        .update(transactions)
        .set(values)
        .where(inArray(transactions.id, sql`(select id from ${transactionToUpdate})`))
        .returning({ id: transactions.id });

      if (!data) {
        return c.json({ error: 'Transaction not found' }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = await getAuth(c);
      const { id } = c.req.valid('param');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      if (!id) {
        return c.json({ error: 'Missing id' }, 400);
      }

      const transactionToDelete = await db.$with("transactions_to").as(
        db.select({ id: transactions.id }).from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(
            eq(transactions.id, id),
            eq(accounts.userId, auth.userId),
          ))
      );

      const [data] = await db
        .with(transactionToDelete)
        .delete(transactions)
        .where(inArray(transactions.id, sql`(select id from ${transactionToDelete})`))
        .returning({ id: transactions.id });

      if (!data) {
        return c.json({ error: 'Transaction not found' }, 404);
      }

      return c.json({ data });
    }
  );

export default app;