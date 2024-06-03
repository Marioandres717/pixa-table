import style from "./tableSkeleton.module.css";

type Props = {
  theme: "light" | "dark";
};

export default function TableSkeleton({ theme }: Props) {
  console.log("theme", theme);
  return <div className={style.skeleton} aria-busy={true} />;
}
