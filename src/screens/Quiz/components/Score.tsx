import Award from "assets/headerAwardIcon.svg";
import styles from "./Score.module.scss";

export const Score = () => {
  return (
    <div>
      <div className={styles.container}>
        <img src={Award} alt="Award" />
        <div className={styles.label}>Score:</div>
        <div className="ca-misc--points">0 </div>
      </div>
    </div>
  );
};
