import styles from "./headerSettings.module.css";

type Props = {
  totalItems: number;
  approximateCount: boolean;
};

export default function PageResults({ totalItems, approximateCount }: Props) {
  return totalItems ? (
    <div className={styles.results}>
      {totalItems}
      {approximateCount && "+"} Results
    </div>
  ) : null;
}
