import { ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./Button.module.scss";

interface Props {
  label?: string;
  onClick?: () => void;
  icon?: ReactNode;
  size?: string;
  color?: string;
}

export const Button = ({
  label = "",
  onClick,
  icon,
  size = "medium",
  color = "",
}: Props) => {
  return (
    <button
      className={clsx(styles.btn, styles[color], styles[size])}
      onClick={onClick}
    >
      <div className="ca-misc--button-text">{label}</div>
      {icon}
    </button>
  );
};
