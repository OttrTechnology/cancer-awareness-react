import Heart from "../../../assets/si_Heart.svg";
import NoHeart from "../../../assets/no_Heart.svg";
import styles from "./Header.module.scss";

export const Lives = () => {
  return (
    <div className={styles.ca_lives}>
      <img src={Heart} alt="heart" />
      <img src={Heart} alt="heart" />
      <img src={NoHeart} alt="noheart" />
    </div>
  );
};
