import { Header, GameActions } from "./components";
// import { Question } from "./Question";
// import { Result } from "./Result";
// import mockData from "./cancer-findings-data.json";
import { useGameContext } from "hooks/useGameContext";

export const Quiz = () => {
  // const MOCKDATA = mockData;
  // console.log(MOCKDATA[0].fact);

  const { screens, activeIndex } = useGameContext();

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      {/* <Question /> */}
      {/* <Result isCorrect={false} /> */}
      {screens[activeIndex]}
      <GameActions />
    </div>
  );
};
