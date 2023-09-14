import { Header, GameActions } from "./components";
import { useGameContext } from "hooks";
import { Question } from "screens/Quiz/Question";
import { Result } from "screens/Quiz/Result";

export const Quiz = () => {
  const { activeQuizIndex } = useGameContext();

  return (
    <div className="ca-min-h-screen flex flex-col justify-between content-center flex-wrap ca-gap--16">
      <Header />
      {activeQuizIndex === "QUESTION" ? <Question /> : <Result />}
      <GameActions />
    </div>
  );
};
