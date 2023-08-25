import deodorant from "../../assets/deodorant.svg";
// import no from "../../assets/bx-x.svg.svg";
// import yes from "../../assets/bx-check.svg.svg";

export const Question = () => {
  return (
    <div>
      <div className="quiz_content">
        <div className="quiz_container container-w">
          <div className="quiz_question ca-heading--three question-text-p">
            <img
              className="quiz_img top question-img-m"
              src={deodorant}
              alt="deodorant"
            />
            Antiperspirants and deodorants contain cancer causing substances
            that are absorbed, particularly after shaving.
          </div>
        </div>
      </div>

      {/* <div className="btn_container grid_footer">
        <button className="btn_answer">
          <img src={no} alt="no" />
        </button>
        <button className="btn_answer">
          <img src={yes} alt="yes" />
        </button>
      </div> */}
    </div>
  );
};
