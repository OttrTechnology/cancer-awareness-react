import Heart from "../../../assets/si_Heart.svg";
import NoHeart from "../../../assets/no_Heart.svg";

export const Lives = () => {
  return (
    <div className="flex items-start">
      <img src={Heart} alt="heart" />
      <img src={Heart} alt="heart" />
      <img src={NoHeart} alt="noheart" />
    </div>
  );
};
