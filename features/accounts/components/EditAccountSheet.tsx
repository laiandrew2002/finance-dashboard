import { z } from "zod";
import { Loader2 } from "lucide-react";
import { insertAccountSchema } from "@/db/schema";
import { useGetAccount } from "../api/use-get-account";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useConfirm } from "@/hooks/use-confirm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./AccountForm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete",
    "Are you sure you want to delete this account?"
  );
  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isLoading = accountQuery.isLoading || editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (data: FormValues) => {
    editMutation.mutate(data, { onSuccess: () => onClose() });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, { onSuccess: () => onClose() });
    }
  };

  const defaultValues = accountQuery.data ? { name: accountQuery.data.name } : { name: "" };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Update an existing account</SheetDescription>
          </SheetHeader>
          {isLoading
            ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin"/>
              </div>
            )
            : <AccountForm
              id={id}
              disabled={isLoading}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
            />
          }
        </SheetContent>
      </Sheet>
    </>
  );
};
