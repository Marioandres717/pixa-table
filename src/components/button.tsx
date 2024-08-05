import clsx from "clsx";
import { ComponentProps } from "react";

type Props = ComponentProps<"button">;

export function Button({ children, className, ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "rounded-[3px] px-3 py-0.5 text-sm disabled:cursor-not-allowed disabled:fill-white/30 disabled:text-white/30 dark:text-white dark:hover:bg-black-85 dark:focus:bg-aqua-120 dark:focus:text-black-100 dark:active:bg-black-85",
        className,
      )}
    >
      {children}
    </button>
  );
}
