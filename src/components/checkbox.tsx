import { HTMLProps, useEffect, useRef } from "react";
import clsx from "clsx";

export function IndeterminateCheckbox({
  indeterminate,
  className,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      name="selectable-col"
      type="checkbox"
      ref={ref}
      className={clsx(
        "size-5 cursor-pointer rounded-sm border border-solid border-black-80 ring-0 ring-offset-0 checked:bg-blue-100 indeterminate:bg-blue-100 checked:hover:bg-blue-120 indeterminate:hover:bg-blue-120 dark:checked:hover:bg-blue-80 dark:indeterminate:hover:bg-blue-80",
        className,
      )}
      {...rest}
    />
  );
}
