import { EventImage } from "../types/events.types";

type PossibleError = string | null;

interface EventCreationFields {
  name: string;
  description: string;
  date: Date;
  hour: Date;
  selectedCategories: number[];
  duration: string;
  image: EventImage;
}

interface EventCreationValidationErrors {
  name: PossibleError;
  description: PossibleError;
  date: PossibleError;
  hour: PossibleError;
  selectedCategories: PossibleError;
  duration: PossibleError;
  image: PossibleError;
}

export function validateEventCreationData(
  eventData: EventCreationFields
): EventCreationValidationErrors {
  const eventCreationErrors = {
    name: validateRequired("nombre", eventData.name),
    description: validateRequired("descripción", eventData.description),
    date: validateDateOrHour("date", eventData.date),
    hour: validateDateOrHour("hour", eventData.hour),
    selectedCategories: validateCategories(eventData.selectedCategories),
    duration: validateDuration(eventData.duration),
    image: validateImage(eventData.image),
  };

  return eventCreationErrors;
}

function validateRequired(fieldName: string, value: string) {
  if (!value || value.length == 0) {
    return `El campo de ${fieldName} es requerido`;
  }
  return null;
}

function validateDateOrHour(hourOrDate: "date" | "hour", date: Date) {
  if (!date) {
    return `Por favor, selecciona una ${
      hourOrDate === "date" ? "fecha" : "hora"
    }`;
  }
  return null;
}

function validateCategories(categoryIds: number[]) {
  if (!categoryIds || categoryIds.length === 0) {
    return "Por favor, selecciona una categoría";
  }
  return null;
}

function validateDuration(duration: string) {
  const error = validateRequired("duración", duration);
  if (error) return error;

  if (!Number(duration)) {
    return "Por favor, selecciona un valor númerico";
  }
  return null;
}

function validateImage(image: EventImage) {
  if (!image) {
    return "Por favor, selecciona una imagen";
  }
  return null;
}
