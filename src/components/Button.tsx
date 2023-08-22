import styles from "./Button.module.scss";

interface Props {
  label?: string;
  onClick?: () => void;
}

export const Button = ({ label = "", onClick }: Props) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {label}
    </button>
  );
};
