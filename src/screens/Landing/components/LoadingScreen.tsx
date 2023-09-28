import { useEffect, useRef } from "react";

import { gsap, Cubic } from "gsap";

import styles from "./LoadingScreen.module.scss";

interface Props {
  preloadedImagePercentage: number;
}

export const LoadingScreen = ({ preloadedImagePercentage }: Props) => {
  const landingRef = useRef(null);
  const loadingImageRef = useRef(null);
  const loadingTextRef = useRef(null);
  const loadingContainerRef = useRef(null);
  const ProgressBarRef = useRef(null);

  console.log(preloadedImagePercentage);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(landingRef.current, {
        width: `${preloadedImagePercentage}%`,
      });
    });

    return () => ctx.kill();
  }, [preloadedImagePercentage]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        loadingImageRef.current,
        { y: 60 },
        { y: 0, delay: 0.2, duration: 0.6, ease: Cubic.easeOut }
      )
        .fromTo(
          loadingImageRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3 },
          "<"
        )
        .fromTo(
          loadingTextRef.current,
          { y: 30 },
          { y: 0, duration: 0.6, ease: Cubic.easeOut },
          "<0.1"
        )
        .fromTo(
          loadingTextRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: Cubic.easeOut },
          "<"
        );
    });
    return () => ctx.kill();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    if (preloadedImagePercentage === 100) {
      tl.to(
        loadingImageRef.current,
        { y: 30, delay: 0.5, autoAlpha: 0, duration: 0.3, ease: Cubic.easeOut },
        ">"
      )
        .to(
          loadingTextRef.current,
          { y: 30, autoAlpha: 0, duration: 0.3, ease: Cubic.easeOut },
          "<"
        )
        .to(ProgressBarRef.current, { autoAlpha: 0, duration: 0.3 }, "<")
        .to(loadingContainerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [preloadedImagePercentage]);

  return (
    <div className={styles.loadingContainer} ref={loadingContainerRef}>
      <div className={styles.wrapper}>
        <div className={styles.img} ref={loadingImageRef}>
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="160" height="160" rx="80" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M95.9387 47.3724C99.6452 52.8092 100.37 60.1079 97.9291 68.4609L97.929 68.4611C96.1917 74.4059 92.5309 81.5457 87.6214 88.7972C94.2132 97.1284 101.828 105.417 108.44 111.919L100.027 120.475C93.7668 114.32 86.639 106.629 80.1805 98.6966C74.1145 106.017 66.8322 113.219 58.7808 119.2L51.625 109.567C59.5788 103.658 66.8115 96.3104 72.6739 88.8995C70.2239 85.4693 67.9911 82.0564 66.1149 78.7702C63.4791 74.1535 61.3487 69.447 60.4766 65.1009C58.9122 57.3053 60.767 50.6071 65.0441 45.898C69.1765 41.3483 75.0849 39.1991 80.7083 39.3416C86.3674 39.485 92.2647 41.9833 95.9387 47.3724ZM80.0308 78.4416C78.7387 76.505 77.5653 74.6233 76.5361 72.8205C74.1595 68.6577 72.7454 65.2483 72.242 62.7399L72.242 62.7398C71.3336 58.2131 72.5174 55.5181 73.9271 53.966C75.4816 52.2545 77.908 51.2745 80.4043 51.3378C82.8649 51.4001 84.8719 52.4425 86.0236 54.1319C87.1428 55.7736 88.1651 59.0911 86.4108 65.095M86.4108 65.0952C85.3657 68.6709 83.1943 73.3053 80.0308 78.4416L86.4108 65.0952Z"
              fill="#FA6257"
            />
          </svg>
        </div>

        <div className="ca-heading--three text-center" ref={loadingTextRef}>
          Did you know that{" "}
          {
            // dayjs().format("MMMM")
          }
          October is celebrated as Breast Cancer Awareness Month
        </div>
        <div className={styles.progressBarContainer} ref={ProgressBarRef}>
          <div ref={landingRef} className={styles.progressBar}></div>
        </div>
      </div>
    </div>
  );
};
