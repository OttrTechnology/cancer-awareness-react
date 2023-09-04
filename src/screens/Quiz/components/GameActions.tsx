import no from "assets/buttonIcon/no.svg";
import yes from "assets/buttonIcon/yes.svg";
import Next from "assets/buttonIcon/next-arrow.svg";
import { Button, IconButton } from "components";
import { useGameContext } from "hooks/useGameContext";

export const GameActions = () => {
  const {
    activeIndex,
    handleAnswer,
    handleOnClick,
    handlePlayAgain,
    currentScore,
  } = useGameContext();

  return (
    <div>
      {activeIndex === 0 ? (
        <div className="flex justify-center mb-24 gap-16">
          <IconButton icon={no} onClick={() => handleAnswer(false)} />
          <IconButton icon={yes} onClick={() => handleAnswer(true)} />
        </div>
      ) : (
        <div className="flex justify-center mb-24">
          <Button
            onClick={() =>
              activeIndex === 1
                ? handleOnClick(currentScore)
                : handlePlayAgain()
            }
            label={activeIndex === 1 ? "Next" : "Try Again"}
            icon={activeIndex === 1 && <img src={Next} />}
          />
        </div>
      )}
    </div>
  );
};