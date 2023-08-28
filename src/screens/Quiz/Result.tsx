import Correct from "../../assets/resultEmoji/right.png";
// import Wrong from "../../assets/resultEmoji/wrong.png";
// import Next from "../../assets/bx-arrow-back.svg.svg";
import styles from "./Result.module.scss";

export const Result = () => {
  return (
    <div className="flex justify-center">
      <div className="pt-16 relative container-w">
        <div className={styles.resultSection}>
          <img className={styles.image} src={Correct} alt="smile" />

          <div className="flex flex-col">
            <div className="mb-6">
              <div className={styles.correctAns}>Correct Answer</div>
              <div className="ca-body--sm">That’s great. Keep going</div>
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
