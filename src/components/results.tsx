type Props = {
  totalItems: number;
  approximateCount: boolean;
};

export function PageResults({ totalItems = 0, approximateCount }: Props) {
  return (
    <span
      role="status"
      aria-live="polite"
      className="text-nowrap font-medium leading-normal"
    >
      {totalItems}
      {approximateCount && "+"} Results
    </span>
  );
}
