import Correct from "../../assets/correct.png";
// import Wrong from "../../assets/wrong.png";
// import Next from "../../assets/bx-arrow-back.svg.svg";
import styles from "./Result.module.scss";

export const Result = () => {
  return (
    <div className={styles.quizContent}>
      <div className="result_container container-w">
        <div className="quiz_question pt-[72px] px-24 pb-16 ">
          <img
            className="result_img top-0 quiz_img"
            src={Correct}
            alt="smile"
          />
          <div className="result_info">
            <div className="answer-mb">
              <div className="text-[44px] text-[#00886B]">Correct Answer</div>
              <div className="ca-body--md">That’s great. Keep going</div>
            </div>
            <div className="ca-body--sm explain-mb">
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

      {/* <div className="absolute top-0 mx-auto rounded-full flex flex-wrap justify-center content-center">
          
        </div> */}
    </div>
  );
};
