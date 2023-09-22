import { useGameContext } from "hooks";
import styles from "./Question.module.scss";

export const Question = () => {
  const { currentQuestion } = useGameContext();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.innerContainer}>
          <img
            className={styles.image}
            src={`${import.meta.env.VITE_ILLUSTRATIONS_BASE_URL}/${
              currentQuestion.imgSrc
            }`}
            alt={currentQuestion.imgSrc}
          />

          <div className="ca-heading--three ">{currentQuestion.claim}</div>
        </div>
      </div>
    </div>
  );
};
