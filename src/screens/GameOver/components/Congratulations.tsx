import { useEffect, useRef } from "react";
import { Cubic, gsap } from "gsap";
import clsx from "clsx";

import congratulations from "assets/resultEmoji/congratulations.svg";

import styles from "./index.module.scss";

export const CongratulationsAnimation = () => {
  const gameOverRef = useRef(null);
  const gameOverEmojiRef = useRef(null);
  const gameOverTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        gameOverEmojiRef.current,
        { y: 60 },
        { y: 0, duration: 0.6, ease: Cubic.easeOut }
      )
        .fromTo(
          gameOverTextRef.current,
          { y: 30 },
          { y: 0, duration: 0.6, ease: Cubic.easeOut },
          "<"
        )
        .to(gameOverRef.current, {
          autoAlpha: 0,
          ease: Cubic.easeOut,
          delay: 0.2,
          duration: 0.3,
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper} ref={gameOverRef}>
      <img
        ref={gameOverEmojiRef}
        src={congratulations}
        className={styles.img}
      />

      <div
        className={clsx("ca-heading--one", styles.congratulationsText)}
        ref={gameOverTextRef}
      >
        Congratulations
      </div>
    </div>
  );
};
