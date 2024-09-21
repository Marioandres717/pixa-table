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
        "!size-5 cursor-pointer rounded-[3px] border border-solid border-black-40 checked:bg-blue-120 indeterminate:bg-blue-120 hover:!border-current focus:ring-0 focus:ring-offset-0 dark:border-black-80 dark:checked:bg-blue-100 dark:indeterminate:bg-blue-100",
        className,
      )}
      {...rest}
    />
  );
}
