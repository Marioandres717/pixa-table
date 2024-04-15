import styles from "./headerSettings.module.css";

type Props = {
  totalItems: number;
  approximateCount: boolean;
};

export function PageResults({ totalItems = 0, approximateCount }: Props) {
  return (
    <div className={styles.results}>
      {totalItems}
      {approximateCount && "+"} Results
    </div>
  );
}
