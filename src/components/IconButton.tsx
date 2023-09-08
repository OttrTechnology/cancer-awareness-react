import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props {
  icon: ReactNode;
  onClick?: () => void;
}

export const IconButton = ({ onClick, icon }: Props) => {
  return (
    <button className={styles.btnIcon} onClick={onClick}>
      {icon}
    </button>
  );
};
