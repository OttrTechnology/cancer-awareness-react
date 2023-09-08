import { Button, IconButton } from "components";
import { useGameContext } from "hooks";
import { BiCheck } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BiX } from "react-icons/bi";

export const GameActions = () => {
  const { activeQuizIndex, handleAnswer, handleNext, currentScore } =
    useGameContext();

  return (
    <div>
      {activeQuizIndex === "QUESTION" ? (
        <div className="flex justify-center mb-24 gap-16">
          <IconButton
            icon={<BiX size={64} />}
            onClick={() => handleAnswer(false)}
          />
          <IconButton
            icon={<BiCheck size={64} />}
            onClick={() => handleAnswer(true)}
          />
        </div>
      ) : (
        <div className="flex justify-center mb-24 gap-8">
          <Button
            size="medium"
            color=""
            onClick={() => handleNext(currentScore)}
            label="Next"
            icon={<BiRightArrowAlt size={28} />}
          />
        </div>
      )}
    </div>
  );
};
