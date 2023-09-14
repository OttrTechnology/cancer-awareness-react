import { Landing, Quiz, GameOver } from "screens";
import { useGameContext } from "hooks";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const App = () => {
  const { activeScreen } = useGameContext();
  const mainRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const gameOverRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.set(quizRef.current, { display: "none", duration: 0 });
  //     gsap.set(gameOverRef.current, { display: "none", duration: 0 });
  //   });

  //   return () => ctx.revert();
  // }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      console.log(activeScreen);
      switch (activeScreen) {
        case "LANDING": {
          const tl = gsap.timeline({
            defaults: { duration: 1 },
          });
          tl.to(landingRef.current, { display: "block", duration: 0 }, ">")
            .to(landingRef.current, { autoAlpha: 1 }, ">")
            .to(quizRef.current, {
              autoAlpha: 0,
            })
            .to(gameOverRef.current, {
              autoAlpha: 0,
            });
          break;
        }
        case "QUIZ": {
          const tl = gsap.timeline({ defaults: { duration: 0.5 } });
          tl.to(landingRef.current, { autoAlpha: 0 }, "transitToQuiz")
            .to(landingRef.current, { display: "none", duration: 0 }, ">")
            .to(quizRef.current, { autoAlpha: 1 }, "transitToQuiz")
            .to(quizRef.current, { display: "block", duration: 0 }, "<");
          break;
        }
        case "GAME_OVER": {
          const tl = gsap.timeline({ defaults: { duration: 0.5 } });
          tl.to(landingRef.current, { autoAlpha: 0 }, "transitToGameOver")
            .to(landingRef.current, { display: "none", duration: 0 }, "<")
            .to(
              quizRef.current,
              { display: "block", autoAlpha: 0, duration: 1 },
              "transitToGameOver"
            )
            .to(quizRef.current, { display: "none", duration: 0 }, ">")
            // .to(
            //   quizRef.current,
            //   { display: "none", duration: 0 },
            //   ">transitToGameOver"
            // )
            .to(gameOverRef.current, { display: "block", duration: 0 }, ">")
            .to(gameOverRef.current, { autoAlpha: 1 }, ">");
          break;
        }
        default:
          break;
      }
    }, mainRef);

    return () => ctx.revert(); // cleanup
  }, [activeScreen]);
  return (
    <div
      className={activeScreen === "GAME_OVER" ? "ca-gameOver" : ""}
      ref={mainRef}
    >
      <div ref={landingRef} className="hidden">
        <Landing />
      </div>
      <div ref={quizRef} className="hidden">
        <Quiz />
      </div>
      <div ref={gameOverRef} className="hidden">
        <GameOver />
      </div>
    </div>
  );
};

export default App;
