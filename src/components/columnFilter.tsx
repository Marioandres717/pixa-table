import { Header } from "@tanstack/react-table";
import { Icon } from "./icon";

import styles from "./columnFilter.module.css";

type Props<TData> = {
  header: Header<TData, unknown>;
};
export default function ColumnFilter<TData>({ header }: Props<TData>) {
  if (!header.column.getCanFilter()) {
    return null;
  }
  return (
    <Icon
      icon="filter"
      color="var(--ml-text-color)"
      size={16}
      className={styles.filter}
    />
  );
}
