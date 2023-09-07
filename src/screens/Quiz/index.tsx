import { Header, GameActions } from "./components";
import { useGameContext } from "hooks";
import { Question } from "screens/Quiz/Question";
import { Result } from "screens/Quiz/Result";

export const Quiz = () => {
  const { activeQuizIndex } = useGameContext();

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      {activeQuizIndex === "QUESTION" ? <Question /> : <Result />}
      <GameActions />
    </div>
  );
};
