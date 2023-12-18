import { forwardRef } from "react";
import { classNames } from "../utils/misc.js";

export function Label({ className, ...props }) {
  return (
    <label
      {...props}
      className={classNames(
        "block text-sm/6 font-medium text-gray-900",
        className,
      )}
    />
  );
}

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={classNames(
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 aria-[invalid]:text-red-900 aria-[invalid]:ring-red-300 aria-[invalid]:placeholder:text-red-300 aria-[invalid]:focus:ring-red-500 sm:text-sm/6",
      className,
    )}
  />
));
Input.displayName = "Input";

export const TextArea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={classNames(
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 aria-[invalid]:text-red-900 aria-[invalid]:ring-red-300 aria-[invalid]:placeholder:text-red-300 aria-[invalid]:focus:ring-red-500 sm:text-sm/6",
      className,
    )}
  />
));
TextArea.displayName = "TextArea";
