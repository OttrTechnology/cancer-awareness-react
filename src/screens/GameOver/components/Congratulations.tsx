import { useEffect, useRef } from "react";
import { Cubic, gsap } from "gsap";
import congratulations from "assets/resultEmoji/happy.svg";
import styles from "./index.module.scss";
import clsx from "clsx";

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
    <>
      <div className={styles.wrapper} ref={gameOverRef}>
        <img
          className={styles.img}
          src={congratulations}
          ref={gameOverEmojiRef}
        />
        <div
          className={clsx("ca-heading--one", styles.congratulationsText)}
          ref={gameOverTextRef}
        >
          Congratulations
        </div>
      </div>
    </>
  );
};
