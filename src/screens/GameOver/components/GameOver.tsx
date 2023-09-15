import { useEffect, useRef } from "react";
import gsap from "gsap";
import gameOver from "assets/resultEmoji/gameover.svg";
import { useGameContext } from "hooks";
import styles from "./index.module.scss";
import clsx from "clsx";

export const GameOverAnimation = () => {
  const { remainingLives } = useGameContext();

  const gameOverRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gameOverRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 2 }
      );
    });

    return () => ctx.revert();
  }, [remainingLives]);

  return (
    <>
      <div className={styles.wrapper} ref={gameOverRef}>
        <img className={styles.img} src={gameOver} />
        <div className={clsx("ca-heading--one", styles.gameOverText)}>
          Game Over!
        </div>
      </div>
    </>
  );
};
