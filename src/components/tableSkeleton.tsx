import style from "./tableSkeleton.module.css";

export default function TableSkeleton() {
  return <div className={style.skeleton} aria-busy={true} />;
}
