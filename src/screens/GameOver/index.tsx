import { useGameContext } from "hooks/useGameContext";
import styles from "./GameOver.module.scss";
import trophy from "assets/trophy.svg";
import { Button } from "components";
import { useLayoutEffect } from "react";

export const GameOver = () => {
  const { currentScore, highScore, handlePlayAgain } = useGameContext();

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--background-color", "#ffda91");

    return () => {
      document.documentElement.style.setProperty(
        "--background-color",
        "#f7e9c1"
      );
    };
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <img className={styles.image} src={trophy} alt={trophy} />
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <div className="ca-heading--three">Appreciate your effort</div>
                <div className="ca-body--sm">
                  Try again! Beat your high score.
                </div>
              </div>
              <div className="flex justify-center gap-20">
                <div className="flex flex-col">
                  <div className={styles.score}>{currentScore}</div>
                  <div className="ca-body--md">Your Score</div>
                </div>
                <div className="flex flex-col">
                  <div className={styles.score}>{highScore}</div>
                  <div className="ca-body--md">High Score</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <Button
              onClick={() => handlePlayAgain()}
              label="Share Your Score"
            />

            <Button onClick={() => handlePlayAgain()} label="Try Again" />
          </div>
        </div>
      </div>
    </div>
  );
};
