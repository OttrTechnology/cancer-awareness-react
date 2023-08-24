import Correct from "../../assets/correct.png";
import Wrong from "../../assets/wrong.png";
import Next from "../../assets/bx-arrow-back.svg.svg";

export const Result = () => {
  return (
    <div>
      <div className="relative my-11 min-w-[912px] min-h-[459px] flex flex-wrap justify-center content-center">
        <div className="absolute bottom-0 bg-[#F7E9C1] text-[#262730] pt-[72px] px-24 pb-16 text-center ">
          <div className="mb-8">
            <div className="mb-6">
              <div className="text-[44px] text-[#00886B]">Correct Answer </div>
              <div className="text-lg text-[#262730]">
                That’s great. Keep going
              </div>
            </div>
            <div className="text-[22px] text-[#262730]">
              Deodorants and antiperspirants sometimes contain ingredients
              linked to cancer. Some studies of antiperspirants have provided
              conflicting results, though, so more research is needed.
            </div>
          </div>
          <div className="text-xl text-[#470FF4] underline">
            <a href="#">Learn more</a>
          </div>
        </div>
        <div className="absolute top-0 mx-auto rounded-full flex flex-wrap justify-center content-center">
          <img className="h-32 w-32" src={Correct} alt="smile" />
        </div>
      </div>
      <div className=" flex justify-center gap-16">
        <button className="bg-white text-[#262730] text-2xl rounded-full py-5 px-10 flex flex-wrap justify-center content-center">
          Next
          <img className="ml-3" src={Next} alt="next" />
        </button>
      </div>
    </div>
  );
};
