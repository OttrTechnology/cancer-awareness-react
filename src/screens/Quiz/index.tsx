import { Header } from "./components/Header";
// import { Question } from "./Question";
import { Result } from "./Result";
import { GameActions } from "./GameActions";

export const Quiz = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      {/* <Question /> */}
      <Result />
      <GameActions />
    </div>
  );
};
