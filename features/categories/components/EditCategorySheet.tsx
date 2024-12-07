import { z } from "zod";
import { Loader2 } from "lucide-react";
import { insertCategoriesSchema } from "@/db/schema";
import { useGetCategory } from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { useConfirm } from "@/hooks/use-confirm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./CategoryForm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete",
    "Are you sure you want to delete this category?"
  );
  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading || editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (data: FormValues) => {
    editMutation.mutate(data, { onSuccess: () => onClose() });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, { onSuccess: () => onClose() });
    }
  };

  const defaultValues = categoryQuery.data ? { name: categoryQuery.data.name } : { name: "" };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Update an existing category</SheetDescription>
          </SheetHeader>
          {isLoading
            ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin"/>
              </div>
            )
            : <CategoryForm
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
