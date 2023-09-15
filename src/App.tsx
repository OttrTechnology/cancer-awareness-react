import { clsx } from "clsx";
import { Landing, Quiz, GameOver } from "screens";
import { useGameContext } from "hooks";
import { useEffect } from "react";
import { gsap } from "gsap";

const App = () => {
  const { activeScreen } = useGameContext();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (activeScreen !== "LANDING") {
        gsap.to("body", { backgroundColor: "#F7EEC1" });
      }
    });

    return () => ctx.revert();
  }, [activeScreen]);

  return (
    <div className={clsx(activeScreen === "GAME_OVER" && "ca-gameOver")}>
      {(activeScreen === "LANDING" ||
        activeScreen === "TRANSITIONING_FROM_LANDING") && <Landing />}

      {(activeScreen === "QUIZ" ||
        activeScreen === "TRANSITIONING_FROM_QUIZ") && <Quiz />}

      {(activeScreen === "GAME_OVER" ||
        activeScreen === "TRANSITIONING_FROM_GAME_OVER") && <GameOver />}
    </div>
  );
};

export default App;
