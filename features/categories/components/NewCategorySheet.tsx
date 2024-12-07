import  { useNewCategory } from "@/features/categories/hooks/use-new-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./CategoryForm";
import { insertCategoriesSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategory } from "../api/use-create-category";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, { onSuccess: () => onClose() });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create a new category to organize your transactions</SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
          }}
          onDelete={() => {}}
        />
      </SheetContent>
    </Sheet>
  );
};