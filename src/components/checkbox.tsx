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
        "!size-[18px] cursor-pointer rounded-[3px] !b-subtle checked:!bg-interaction-accent indeterminate:!bg-interaction-accent hover:!border-current focus:!ring-0 focus:!ring-offset-0 dark:!b-strong dark:checked:!bg-interaction-accent dark:indeterminate:!bg-interaction-accent",
        className,
      )}
      {...rest}
    />
  );
}
