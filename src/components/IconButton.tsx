import styles from "./Button.module.scss";

interface Props {
  onClick?: () => void;
  icon?: string;
}

export const IconButton = ({ onClick, icon }: Props) => {
  return (
    <button className={styles.btnIcon} onClick={onClick}>
      <img src={icon} />
    </button>
  );
};
