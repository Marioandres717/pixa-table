import classNames from "classnames";

type Props = {
  className?: string;
};

export default function TableSidebar({ className }: Props) {
  return (
    <div className={classNames("border-l dark:border-black-92.5", className)}>
      {/* TableSidebar */}
    </div>
  );
}
