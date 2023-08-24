import a from "../../assets/a.svg";
import no from "../../assets/bx-x.svg.svg";
import yes from "../../assets/bx-check.svg.svg";

export const Question = () => {
  return (
    <div>
      <div className="relative my-11 min-w-[912px] min-h-[494px] flex flex-wrap justify-center content-center">
        <div className="absolute bottom-0 bg-[#F7E9C1] text-[#262730] text-[32px] tracking-tight leading-[41.6px] pt-40 px-24 pb-20 text-center ">
          Antiperspirants and deodorants contain cancer causing substances that
          are absorbed, particularly after shaving.
        </div>
        <div className="absolute top-0  bg-[#F6CA73] h-60 w-60 mx-auto rounded-full flex flex-wrap justify-center content-center">
          <img className="h-[108px] w-[135px]" src={a} alt="a" />
        </div>
      </div>
      <div className=" flex justify-center gap-16">
        <button className="bg-white rounded-full h-[120px] w-[120px] flex flex-wrap justify-center content-center">
          <img src={no} alt="no" />
        </button>
        <button className="bg-white rounded-full h-[120px] w-[120px] flex flex-wrap justify-center content-center">
          <img src={yes} alt="yes" />
        </button>
      </div>
    </div>
  );
};
