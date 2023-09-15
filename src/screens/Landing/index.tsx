import { useEffect, useRef } from "react";
import {
  BiLogoDiscordAlt,
  BiLogoFacebook,
  BiLink,
  BiLogoLinkedin,
} from "react-icons/bi";
import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";
import clsx from "clsx";
import { useWindowSize } from "usehooks-ts";

import LandingpageArrow from "assets/homepageArrow.svg";
import LandingLogo from "assets/homeLogo.svg";

import { useGameContext } from "hooks";

import data from "../Quiz/cancer-findings-data.json";
import styles from "./index.module.scss";

export const Landing = () => {
  const { setActiveScreen } = useGameContext();

  const { width, height } = useWindowSize();

  const canvasRef = useRef(null);
  const engine = useRef(Engine.create());
  const scene = useRef(null);

  const startQuiz = () => setActiveScreen("QUIZ");

  useEffect(() => {
    const render = Render.create({
      element: scene.current || undefined,
      engine: engine.current,
      canvas: canvasRef.current || undefined,
      options: { width, height, wireframes: false, background: "transparent" },
    });

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: document.body.offsetWidth, y: document.body.offsetHeight },
    });

    Composite.add(engine.current.world, [
      Bodies.rectangle(-120, height / 2, 20 + 180, height + 10, {
        isStatic: true,
        render: {
          fillStyle: "#ffda91",
          strokeStyle: "#ffda91",
          lineWidth: 3,
        },
      }),
      Bodies.rectangle(width / 2, height + 40, width + 120, 90, {
        isStatic: true,
        render: {
          fillStyle: "#ffda91",
          strokeStyle: "#ffda91",
          lineWidth: 3,
        },
      }),
      Bodies.rectangle(width + 80, height / 2, 120, height, {
        isStatic: true,
        render: {
          fillStyle: "#ffda91",
          strokeStyle: "#ffda91",
          lineWidth: 3,
        },
      }),
    ]);

    data
      .sort(() => 0.5 - Math.random())
      .slice(0, width / 90)
      .forEach((App, index) => {
        Composite.add(engine.current.world, [
          Bodies.circle(width / 2, -100 * index, 60, {
            density: 0.001,
            frictionAir: 0.02,
            frictionStatic: 0.5,
            restitution: 0.6,
            friction: 0.1,
            render: {
              sprite: {
                texture: `/questionImg/${App.imgSrc}`,
                xScale: 0.5,
                yScale: 0.5,
              },
            },
          }),
        ]);
      });

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
    Composite.add(engine.current.world, mouseConstraint);
    render.mouse = mouse;

    Runner.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      Composite.clear(engine.current.world, false);
      Engine.clear(engine.current);

      render.canvas.remove();
      render.textures = {};
    };
  });

  return (
    <>
      {window.innerWidth > 640 && (
        <div ref={scene} className="fixed w-full h-full">
          <canvas ref={canvasRef} />
        </div>
      )}

      <div className={styles.wrapper}>
        <div className="flex justify-center items-center h-screen lg:block relative mx-auto lg:ca-pt--120 pointer-events-none">
          <div className="lg:grid lg:grid-cols-10 ca-gap--24">
            <div className="lg:col-span-6 relative">
              <div className="flex items-end lg:ca-gap--8 ca-gap--4 ca-mb--24 lg:ca-mb--32 select-none">
                <img
                  src={LandingLogo}
                  alt="Ottr Logo"
                  className={styles.logo}
                />

                <span className={clsx(styles.logoTitle, "ca-text--black-80")}>
                  Presents
                </span>
              </div>

              <div className="ca-mb--16 select-none lg:ca-mb--24">
                <h1 className="ca-heading--one">Cancer Insights Challenge</h1>
              </div>

              <div className="ca-mb--48 lg:ca-mb--64 select-none max-w-[27.625em]">
                <p className="ca-body--md ca-text--black-80">
                  Test your cancer knowledge and elevate your understanding of
                  the disease
                </p>
              </div>

              <div className="flex items-center ca-gap--24 lg:ca-gap--16 pointer-events-auto select-none">
                <span className="ca-body--sm">Share</span>

                <div className="flex ca-gap--24 lg:ca-gap--12">
                  <a className="cursor-pointer" href="https://www.google.com">
                    <BiLink className={styles.social} />
                  </a>

                  <a className="cursor-pointer" href="https://www.linkedin.com">
                    <BiLogoLinkedin className={styles.social} />
                  </a>

                  <a className="cursor-pointer" href="https://www.facebook.com">
                    <BiLogoFacebook className={styles.social} />
                  </a>

                  <a className="cursor-pointer" href="https://www.discord.com">
                    <BiLogoDiscordAlt className={styles.social} />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative flex justify-end md:mr-32 lg:mr-0 col-start-7 mr-2 lg:col-start-8 col-span-3 mt-14 lg:mt-auto  pointer-events-auto">
              <button className={styles.primaryButton} onClick={startQuiz}>
                Take the quiz
              </button>
              <div className={styles.arrow}>
                <img
                  src={LandingpageArrow}
                  className={styles.arrow__img}
                  alt="arrow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
