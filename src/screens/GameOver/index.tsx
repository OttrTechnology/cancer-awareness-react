import { useGameContext } from "hooks";
import styles from "./index.module.scss";
import trophy from "assets/trophy.svg";
import gsap from "gsap";

// import gameover from "assets/resultEmoji/gameover.svg";
import { Button } from "components";
import { useEffect, useLayoutEffect, useRef } from "react";
import { GameOverAnimation } from "./components/gameOver";

export const GameOver = () => {
  const { currentScore, highScore, handlePlayAgain, remainingLives } =
    useGameContext();

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--background-color", "#ffda91");

    return () => {
      document.documentElement.style.setProperty(
        "--background-color",
        "#f7e9c1"
      );
    };
  }, []);

  const gameOverRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gameOverRef.current, {
        autoAlpha: 0,
        delay: 3,
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, [remainingLives]);

  return (
    <>
      <div className="h-screen flex flex-col justify-center overflow-hidden">
        <GameOverAnimation />
        <div className="flex justify-center" ref={gameOverRef}>
          <div className={styles.container}>
            <div className={styles.innerContainer}>
              <img className={styles.image} src={trophy} alt={trophy} />

              <div className="flex flex-col ca-gap--40">
                <div className="flex flex-col">
                  <div className="ca-mb--8">
                    <div className="ca-heading--three">
                      Appreciate your effort
                    </div>
                  </div>
                  <div className="ca-body--sm ca-text--black-70">
                    Try again! Beat your high score.
                  </div>
                </div>

                <div className="flex justify-center ca-gap--80">
                  <div className="flex flex-col ca-gap--4">
                    <div className={styles.score}>{currentScore}</div>
                    <div className="ca-body--md ca-text--black-80">
                      Your Score
                    </div>
                  </div>

                  <div className="flex flex-col ca-gap--4">
                    <div className={styles.score}>{highScore}</div>
                    <div className="ca-body--md ca-text--black-80">
                      High Score
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center ca-gap--32">
              <Button
                onClick={handlePlayAgain}
                label="Share Your Score"
                color="primary"
                size="fixed-width"
              />

              <Button
                color=""
                size="fixed-width"
                onClick={handlePlayAgain}
                label="Try Again"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
