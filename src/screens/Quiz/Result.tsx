import { clsx } from "clsx";
import { useGameContext } from "hooks";
import Correct from "assets/resultEmoji/right.png";
import Wrong from "assets/resultEmoji/wrong.png";
import styles from "./Result.module.scss";

export const Result = () => {
  const { currentQuestion, userAnswer } = useGameContext();
  return (
    <div className="flex justify-center">
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <img
            className={styles.image}
            src={currentQuestion.fact === userAnswer ? Correct : Wrong}
          />

          <div className="flex flex-col">
            <div className="ca-mb--8">
              <div
                className={clsx(
                  currentQuestion.fact === userAnswer
                    ? styles.correctAnswer
                    : styles.wrongAnswer
                )}
              >
                {currentQuestion.fact === userAnswer
                  ? "Correct Answer"
                  : "Wrong Answer"}
              </div>
            </div>
            <div className="ca-mb--24">
              <div className="ca-body--sm ca-text--black-70">
                {currentQuestion.fact === userAnswer
                  ? "That’s great. Keep going"
                  : "It’s not the end. Try again."}
              </div>
            </div>

            <div className="ca-mb--32">
              <p className="ca-body--md ca-text--black-80">
                {currentQuestion.explanation}
              </p>
            </div>

            <a
              className="ca-misc--link"
              target="_blank"
              href={currentQuestion.source}
              rel="noreferrer"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
