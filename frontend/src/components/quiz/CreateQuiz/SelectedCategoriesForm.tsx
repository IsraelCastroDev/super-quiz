import { Label } from "@components/ui/Form";
import { ErrorMessage, Loader } from "@components/ui";
import { Category, CategorySelectedForm, CreateQuiz } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  isPending: boolean;
  categories: Category[] | undefined;
  register: UseFormRegister<CreateQuiz>;
  errors: FieldErrors<CreateQuiz>;
  handleSelectedCategory: (
    e: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => void;
  isCategorySelected: (nameCategory: Category["name"]) => boolean;
  selectedCategories: CategorySelectedForm[];
  handleDelete: (nameCategory: Category["name"]) => void;
}

export function SelectedCategoriesForm({
  isPending,
  categories,
  register,
  errors,
  handleSelectedCategory,
  isCategorySelected,
  selectedCategories,
  handleDelete,
}: Props) {
  return (
    <div className="relative aspect-video">
      <Label text="Elige las categorías (max. 3):" />
      <div className="border border-slate-700 rounded-md p-4">
        {isPending ? (
          <Loader />
        ) : (
          categories &&
          categories.map((category) => (
            <div key={category.name}>
              <div className="flex gap-x-2">
                <input
                  type="checkbox"
                  id={category.name}
                  {...register("categories", {
                    required: {
                      value: true,
                      message: "Debes elegir entre 1 - 3 categorías",
                    },
                  })}
                  onChange={(e) => handleSelectedCategory(e, category)}
                  value={category.name}
                  checked={isCategorySelected(category.name)}
                />
                <Label text={category.name} htmlFor={category.name} />
              </div>
            </div>
          ))
        )}

        <div className="flex flex-wrap gap-x-2 mt-3">
          {selectedCategories &&
            selectedCategories.map((category) => (
              <div
                className="relative flex gap-2 bg-slate-300 px-3 py-1 rounded-lg"
                key={category.name}
              >
                <span>{category.name}</span>
                <button
                  onClick={() => handleDelete(category.name)}
                  type="button"
                  className="absolute top-0 right-1"
                >
                  x
                </button>
              </div>
            ))}
        </div>
      </div>
      {errors.categories && (
        <ErrorMessage>{errors.categories?.message}</ErrorMessage>
      )}
    </div>
  );
}
