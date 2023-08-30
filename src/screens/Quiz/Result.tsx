import Correct from "assets/resultEmoji/right.png";
import Wrong from "assets/resultEmoji/wrong.png";
import styles from "./Result.module.scss";

interface Props {
  isCorrect: boolean;
}

export const Result = ({ isCorrect }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="relative ca-container pt-16">
        <div className={styles.body}>
          <img className={styles.image} src={isCorrect ? Correct : Wrong} />

          <div className="flex flex-col">
            <div className="mb-6">
              <div
                className={
                  isCorrect ? styles.correctAnswer : styles.wrongAnswer
                }
              >
                {isCorrect ? "Correct Answer" : "Wrong Answer"}
              </div>
              <div className="ca-body--sm">
                {isCorrect
                  ? "That’s great. Keep going"
                  : "It’s not the end. Try again."}
              </div>
            </div>

            <div className="ca-body--md mb-8">
              Deodorants and antiperspirants sometimes contain ingredients
              linked to cancer. Some studies of antiperspirants have provided
              conflicting results, though, so more research is needed.
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
