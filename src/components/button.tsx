import classNames from "classnames";
import React, { PropsWithChildren } from "react";

type Props = React.HTMLProps<HTMLButtonElement>;

export default function Button({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={classNames(
        "rounded-[3px] px-3 py-0.5 text-sm disabled:cursor-not-allowed disabled:fill-white/30 disabled:text-white/30 dark:text-white dark:hover:bg-black-85 dark:focus:bg-aqua-120 dark:focus:text-black-100 dark:active:bg-black-85",
        props.className,
      )}
      type="button"
    >
      {children}
    </button>
  );
}
