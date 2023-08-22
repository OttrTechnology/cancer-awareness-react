import styles from "./Button.module.scss";

interface Props {
  label?: string;
}

export const Button = ({ label = "" }: Props) => {
  return <button className={styles.btn}>{label}</button>;
};
