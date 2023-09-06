import Correct from "assets/resultEmoji/right.png";
import Wrong from "assets/resultEmoji/wrong.png";
import styles from "./Result.module.scss";
import { useGameContext } from "hooks";

interface Props {
  isCorrect: boolean;
}

export const Result = ({ isCorrect }: Props) => {
  const { currentQuestion, answer } = useGameContext();
  return (
    <div className="flex justify-center">
      <div className="relative ca-container pt-16">
        <div className={styles.body}>
          <img
            className={styles.image}
            src={isCorrect === answer ? Correct : Wrong}
          />

          <div className="flex flex-col">
            <div className="mb-6">
              <div
                className={
                  isCorrect === answer
                    ? styles.correctAnswer
                    : styles.wrongAnswer
                }
              >
                {isCorrect === answer ? "Correct Answer" : "Wrong Answer"}
              </div>
              <div className="ca-body--sm">
                {isCorrect === answer
                  ? "That’s great. Keep going"
                  : "It’s not the end. Try again."}
              </div>
            </div>

            <div className="ca-body--md mb-8">
              {currentQuestion.explanation}
            </div>

            <div className="ca-misc--link">
              <a href="#">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
