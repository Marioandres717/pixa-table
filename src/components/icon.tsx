import { getIcon } from "../utils/icons";

function getSvg(
  icon: unknown,
  styles: React.CSSProperties,
  size: number | string,
  className: string,
) {
  const currentIcon = getIcon(icon);

  const renderPath =
    (iconObj: { attrs: unknown[] }) => (path: string, index: number) => {
      const attrs = (iconObj.attrs && iconObj.attrs[index]) || {};
      return <path style={styles} key={index} d={path} {...attrs} />;
    };

  if (currentIcon) {
    return (
      <svg
        className={className}
        style={styles}
        width={size}
        height={size}
        viewBox={`0 0 ${currentIcon.icon.width || "1024"} ${currentIcon.icon.height || "1024"}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {currentIcon.icon.paths.map(
          renderPath(currentIcon.icon as { attrs: unknown[] }),
        )}
      </svg>
    );
  }

  return null;
}

type IconProps = {
  icon: string;
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
};

export function Icon(props: IconProps) {
  const { color, size = "100%", icon, className = "", style = {} } = props;

  const styles: React.CSSProperties = {
    display: "inline-block",
    ...style,
    fill: color,
    width: size,
    height: size,
  };

  return getSvg(icon, styles, size, className);
}
