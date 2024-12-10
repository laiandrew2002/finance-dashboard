import { z } from "zod";
import { Loader2 } from "lucide-react";
import { insertTransactionsSchema } from "@/db/schema";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm } from "./TransactionForm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete",
    "Are you sure you want to delete this transaction?"
  );

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();

  const onCreateCategory = async (name: string) => categoryMutation.mutate({ name }); 
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = async (name: string) => accountMutation.mutate({ name }); 
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending = 
    transactionQuery.isLoading ||
    editMutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  
  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const onSubmit = (data: FormValues) => {
    editMutation.mutate(data, { onSuccess: () => onClose() });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, { onSuccess: () => onClose() });
    }
  };

  const defaultValues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: transactionQuery.data.amount.toString(),
    date: transactionQuery.data.date
      ? new Date(transactionQuery.data.date)
      : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes,
  } : {
    accountId: '',
    categoryId: '',
    amount: '',
    date: new Date(),
    payee: '',
    notes: '',
  };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Update an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading
            ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin"/>
              </div>
            )
            : <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              onDelete={onDelete}
            />
          }
        </SheetContent>
      </Sheet>
    </>
  );
};
