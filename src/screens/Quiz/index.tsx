import { Header, GameActions } from "./components";
import { useGameContext } from "hooks";

export const Quiz = () => {
  const { screens, activeIndex } = useGameContext();

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      {screens[activeIndex]}
      <GameActions />
    </div>
  );
};
