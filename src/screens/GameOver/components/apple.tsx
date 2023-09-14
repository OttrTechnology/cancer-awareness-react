import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./GameOver.module.scss";
import gameover from "assets/resultEmoji/gameover.svg";
import { useGameContext } from "hooks";

export const GameOverAnimation = () => {
  const gameOverRef = useRef(null);
  const { remainingLives } = useGameContext();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // if (remainingLives === 0) {
      gsap.fromTo(
        gameOverRef.current,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 1,
          delay: 2,
        }
      );
      // }
    });

    return () => ctx.revert(); // cleanup
  }, [remainingLives]);
  // ...
  return (
    <>
      <div className={styles.gameOver} ref={gameOverRef}>
        <img className={styles.gameOverImg} src={gameover} />
        <div className="ca-heading--one">Game Over !</div>
      </div>
    </>
  );
};
