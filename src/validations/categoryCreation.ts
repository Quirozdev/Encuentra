import { supabase } from "../supabase";
import { PossibleError } from "./eventCreation";

export interface CategoryCreationFields {
  name: string;
  color: string;
  emoji: string;
}

export interface CategoryCreationValidationErrors {
  name: PossibleError;
  color: PossibleError;
  emoji: PossibleError;
}

export async function validateCategoryCreationData(
  categoryData: CategoryCreationFields
): Promise<CategoryCreationValidationErrors> {
  const nameValidation = await validateCategoryName(categoryData?.name);

  const categoryCreationErrors = {
    name: nameValidation,
    color: validateRequired(categoryData.color, "Elige un color"),
    emoji: validateRequired(categoryData.emoji, "Elige un emoji"),
  };

  return categoryCreationErrors;
}

function validateRequired(field: string, errorMsg: string): PossibleError {
  if (!field || field.length == 0) {
    return errorMsg;
  }
  return null;
}

async function validateCategoryName(
  categoryName: string
): Promise<PossibleError> {
  const errRequired = validateRequired(categoryName, "Escribe un nombre");
  if (errRequired) {
    return errRequired;
  }

  if (categoryName.length < 3) {
    return "3 carácteres minimo";
  }

  const { data, error } = await supabase
    .from("categorias")
    .select("id")
    .ilike("nombre", `%${categoryName}%`);

  if (data.length > 0) {
    return "Ese nombre ya está en uso";
  }

  return null;
}
