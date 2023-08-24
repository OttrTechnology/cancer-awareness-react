import Award from "../../../assets/award.svg";

export const Score = () => {
  return (
    <div className="flex gap-3 items-center">
      <img src={Award} alt="heart" />
      <div className="text-[#262730] text-xl">Score:</div>
      <div className="text-[#262730] text-5xl">0 </div>
    </div>
  );
};
