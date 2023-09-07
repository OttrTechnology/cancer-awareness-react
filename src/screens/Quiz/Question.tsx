import styles from "./Question.module.scss";
import { useGameContext } from "hooks";

export const Question = () => {
  const { currentQuestion } = useGameContext();
  console.log(currentQuestion);

  return (
    <div className="flex justify-center">
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <img
            className={styles.image}
            src={`/questionImg/${currentQuestion.imgSrc}`}
            alt={currentQuestion.imgSrc}
          />

          <div className="ca-heading--three ">{currentQuestion.claim}</div>
        </div>
      </div>
    </div>
  );
};
