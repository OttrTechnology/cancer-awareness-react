import styles from "./Button.module.scss";

interface Props {
  icon: string;
  onClick?: () => void;
}

export const IconButton = ({ onClick, icon }: Props) => {
  return (
    <button className={styles.btnIcon} onClick={onClick}>
      <img src={icon} />
    </button>
  );
};
