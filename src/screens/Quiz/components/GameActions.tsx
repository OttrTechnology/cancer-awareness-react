import no from "assets/buttonIcon/no.svg";
import yes from "assets/buttonIcon/yes.svg";
import Next from "assets/buttonIcon/next-arrow.svg";
import { Button, IconButton } from "components";
import { useGameContext } from "hooks/useGameContext";

export const GameActions = () => {
  const { activeIndex, handleAnswer, handleOnClick } = useGameContext();

  return (
    <div>
      {activeIndex === 0 ? (
        <div className="flex justify-center mb-24 gap-16">
          <IconButton icon={no} onClick={() => handleAnswer(false)} />
          <IconButton icon={yes} onClick={() => handleAnswer(true)} />
        </div>
      ) : (
        <div
          onClick={handleOnClick}
          className="flex justify-center mb-24 gap-16"
        >
          <Button label="Next" icon={<img src={Next} />} />
        </div>
      )}
      {/* <Button label="Next" icon={<img src={Next} />} /> */}
      {/* <IconButton icon={no} />
      <IconButton icon={yes} /> */}
    </div>
  );
};
