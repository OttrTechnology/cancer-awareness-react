import { Button, IconButton } from "components";
import { useGameContext } from "hooks";
import { BiCheck } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BiX } from "react-icons/bi";

export const GameActions = () => {
  const { activeQuizScreen, handleAnswer, handleNext } = useGameContext();

  return (
    <div>
      {activeQuizScreen === "QUESTION" ? (
        <div className="flex justify-center ca-mb--64 lg:ca-mb--96 ca-gap--64">
          <IconButton icon={<BiX />} onClick={handleAnswer(false)} />
          <IconButton icon={<BiCheck />} onClick={handleAnswer(true)} />
        </div>
      ) : (
        <div className="flex justify-center ca-mb--64 md:ca-mb--96 ca-gap--32">
          <Button
            size="medium"
            onClick={handleNext}
            label="Next"
            icon={<BiRightArrowAlt />}
          />
        </div>
      )}
    </div>
  );
};
