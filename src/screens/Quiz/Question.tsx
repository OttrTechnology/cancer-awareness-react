import deodorant from "../../assets/questionImg/deodorant.svg";
// import no from "../../assets/bx-x.svg.svg";
// import yes from "../../assets/bx-check.svg.svg";
import styles from "./Quiz.module.scss";

export const Question = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className={styles.quizContainer}>
          <div className={styles.questionSection}>
            <img
              className={styles.questionImg}
              src={deodorant}
              alt="deodorant"
            />

            <div className="ca-heading--three">
              Antiperspirants and deodorants contain cancer causing substances
              that are absorbed, particularly after shaving.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
