import { Icon } from "./icon";
import styles from "./expandableRow.module.css";

type Props = {
  isExpanded: boolean;
  toggleExpanded: () => void;
};

export function ExpandableRow({ isExpanded, toggleExpanded }: Props) {
  return (
    <span className={styles["expandable-row-icon"]} onClick={toggleExpanded}>
      <Icon
        icon="arrow"
        size="15px"
        color="transparent"
        className={
          isExpanded
            ? `${styles["arrow-right"]} ${styles["arrow-down"]}`
            : styles["arrow-right"]
        }
      />
    </span>
  );
}
