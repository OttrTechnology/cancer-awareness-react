import Award from "assets/headerAwardIcon.svg";
import styles from "./Score.module.scss";
import { useGameContext } from "hooks/useGameContext";

export const Score = () => {
  const { currentScore } = useGameContext();
  return (
    <div>
      <div className={styles.container}>
        <img src={Award} alt="Award" />
        <div className={styles.label}>Score:</div>
        <div className="ca-misc--points">{currentScore}</div>
      </div>
    </div>
  );
};
