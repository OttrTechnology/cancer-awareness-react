import gameover from "assets/resultEmoji/gameover.svg";
import gsap from "gsap";
import { useGameContext } from "hooks";
import { useEffect, useRef } from "react";
import styles from "./GameOver.module.scss";

export const GameOverAnimation = () => {
  const gameOverRef = useRef(null);
  const { remainingLives } = useGameContext();

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, [remainingLives]);
  return (
    <>
      <div className={styles.gameOver} ref={gameOverRef}>
        <img className={styles.gameOverImg} src={gameover} />
        <div className="ca-heading--one">Game Over !</div>
      </div>
    </>
  );
};
