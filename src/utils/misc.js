import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function classNames(...inputs) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error) {
  if (typeof error === "string") {
    return error;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  console.error("Unable to get error message for error", error);

  return "Unknown Error";
}
