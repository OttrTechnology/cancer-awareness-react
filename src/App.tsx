import { useEffect } from "react";
import { gsap } from "gsap";
import { clsx } from "clsx";
import { useGameContext } from "hooks";
import { Landing, Quiz, GameOver } from "screens";
import styles from "./App.module.scss";

const { lightYellow } = styles;
const backgroundImageURL = "url(/src/assets/pattern.svg)";

const App = () => {
  const { activeScreen } = useGameContext();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (activeScreen == "TRANSITIONING_FROM_LANDING") {
        gsap.to("body", {
          backgroundColor: lightYellow,
          backgroundImage: backgroundImageURL,
          duration: 0.3,
        });
      } else if (activeScreen == "QUIZ") {
        gsap.set("body", {
          backgroundColor: lightYellow,
          backgroundImage: backgroundImageURL,
        });
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
