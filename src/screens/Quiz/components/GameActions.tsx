import { BiCheck, BiRightArrowAlt, BiX } from "react-icons/bi";
import { Button, IconButton } from "components";
import { useGameContext } from "hooks";

export const GameActions = () => {
  const { activeQuizScreen, handleAnswer, handleNext } = useGameContext();

  return (
    <>
      {activeQuizScreen === "QUESTION" ? (
        <div className="flex justify-center ca-gap--64 h-36 lg:h-52">
          <IconButton icon={<BiX />} onClick={handleAnswer(false)} />
          <IconButton icon={<BiCheck />} onClick={handleAnswer(true)} />
        </div>
      ) : (
        <div className="flex h-32 lg:h-40 justify-center ca-gap--32">
          <Button
            size="medium"
            onClick={handleNext}
            label="Next"
            icon={<BiRightArrowAlt />}
          />
        </div>
      )}
    </>
  );
};
