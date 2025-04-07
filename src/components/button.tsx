import clsx from "clsx";
import { ComponentProps } from "react";

type Props = ComponentProps<"button">;

export function Button({ children, className, ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "peer flex h-6 min-w-6 items-center justify-center rounded-[3px] px-3 py-0.5 text hover:bg-black-20 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-black-85 dark:focus:bg-black-85 dark:focus:hover:bg-black-75",
        className,
      )}
    >
      {children}
    </button>
  );
}
