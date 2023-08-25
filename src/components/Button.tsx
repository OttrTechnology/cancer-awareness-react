import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props {
  label?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export const Button = ({ label = "", onClick, icon }: Props) => {
  return (
    <button className={styles.btn_next} onClick={onClick}>
      <div className="ca-misc--button-text">{label}</div>
      {icon}
    </button>
  );
};
