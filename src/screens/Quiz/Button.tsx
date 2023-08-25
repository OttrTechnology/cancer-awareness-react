import no from "../../assets/bx-x.svg.svg";
import yes from "../../assets/bx-check.svg.svg";
import Next from "../../assets/bx-arrow-back.svg.svg";

export const Button = () => {
  return (
    <div className="btn_container">
      <button className="btn_answer">
        <img src={no} alt="no" />
      </button>
      <button className="btn_answer">
        <img src={yes} alt="yes" />
      </button>
      {/* <button className="btn_next">
        Next
        <img className="ml-3" src={Next} alt="next" />
      </button> */}
    </div>
  );
};
