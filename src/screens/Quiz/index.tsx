import { Header, GameActions } from "./components";
// import { Question } from "./Question";
import { Result } from "./Result";

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
