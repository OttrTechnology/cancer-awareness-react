import styles from "./Header.module.scss";
import Award from "../../../assets/headerAwardIcon.svg";
import style from "./Score.module.scss";

export const Score = () => {
  return (
    <div className={styles.score}>
      <img src={Award} alt="Award" />
      <div className={style.scoreTxt}>Score:</div>
      <div className="ca-misc--points">0 </div>
    </div>
  );
};
