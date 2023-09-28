import { BiCheck, BiRightArrowAlt, BiX } from "react-icons/bi";
import { Button, IconButton } from "components";
import { useGameContext } from "hooks";

export const GameActions = () => {
  const { activeQuizScreen, handleAnswer, handleNext } = useGameContext();

  return (
    <>
      {activeQuizScreen === "QUESTION" ? (
        <div className=" ca-footer-answer--btnGroup flex justify-center ca-gap--64">
          <IconButton icon={<BiX />} onClick={handleAnswer(false)} />
          <IconButton icon={<BiCheck />} onClick={handleAnswer(true)} />
        </div>
      ) : (
        <div className="ca-footer-next--btn flex justify-center ca-gap--32">
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
