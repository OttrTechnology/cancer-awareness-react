import { useLayoutEffect } from "react";
import { useBoolean } from "usehooks-ts";
import { useGameContext } from "hooks";
import { Button } from "components";
import trophy from "assets/trophy.svg";
import { Share } from "./components";
import styles from "./GameOver.module.scss";

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

  const { value: share, toggle } = useBoolean(false);

  return (
    <div>
      {share && <Share toggleShare={toggle} />}
      <div className="relative ca-min-h-screen flex flex-col justify-center ">
        <div className="flex justify-center">
          <div className={styles.container}>
            <div className={styles.innerContainer}>
              <img className={styles.image} src={trophy} alt={trophy} />

              <div className="flex flex-col ca-gap--32 lg:ca-gap--40">
                <div className="flex flex-col">
                  <div className="ca-mb--8">
                    <div className="ca-heading--three ">
                      Appreciate your effort
                    </div>
                  </div>
                  <div className="ca-body--sm ca-text--black-70">
                    Try again! Beat your high score.
                  </div>
                </div>

                <div className="flex justify-center ca-gap--48 lg:ca-gap--80">
                  <div className="flex flex-col ca-gap--6 lg:ca-gap--4">
                    <div className={styles.score}>{currentScore}</div>
                    <div className="ca-body--md ca-text--black-80">
                      Your Score
                    </div>
                  </div>

                  <div className="flex flex-col ca-gap--6 lg:ca-gap--4">
                    <div className={styles.score}>{highScore}</div>
                    <div className="ca-body--md ca-text--black-80">
                      High Score
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center ca-gap--16 md:ca-gap--32">
              <Button
                onClick={toggle}
                label="Share Your Score"
                color="primary"
                size="fixed-width"
              />

              <Button
                size="fixed-width"
                onClick={handlePlayAgain}
                label="Try Again"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
