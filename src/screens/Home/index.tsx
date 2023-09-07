import { useEffect, useRef } from "react";
import homeLogo from "assets/homeLogo.svg";

import styles from "./index.module.scss";

import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoDiscordAlt,
  BiLink,
} from "react-icons/bi";

import datas from "../Quiz/cancer-findings-data.json";
import {
  Engine,
  Render,
  Bodies,
  Mouse,
  MouseConstraint,
  Composite,
  Runner,
} from "matter-js";

export const Home = () => {
  const scene = useRef(null);
  const engine = useRef(Engine.create());
  const canvasRef = useRef(null);

  useEffect(() => {
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    const render = Render.create({
      element: scene.current || undefined,
      engine: engine.current,
      canvas: canvasRef.current || undefined,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: document.body.offsetWidth, y: document.body.offsetHeight },
    });

    Composite.add(engine.current.world, [
      Bodies.rectangle(-120, ch / 2, 20 + 180, ch + 10, {
        isStatic: true,
        render: {
          fillStyle: "##FFDA91",
          strokeStyle: "#FFDA91",
          lineWidth: 3,
        },
      }),
      Bodies.rectangle(cw / 2, ch + 40, cw + 120, 90, {
        isStatic: true,
        render: {
          fillStyle: "#FFDA91",
          strokeStyle: "#FFDA91",
          lineWidth: 3,
        },
      }),
      Bodies.rectangle(cw + 80, ch / 2, 120, ch, {
        isStatic: true,
        render: {
          fillStyle: "#FFDA91",
          strokeStyle: "#FFDA91",
          lineWidth: 3,
        },
      }),
    ]);

    datas
      .sort(() => 0.5 - Math.random())
      .splice(0, 10)
      .forEach((App, index) => {
        Composite.add(engine.current.world, [
          Bodies.circle(cw / 2, -90 * index, 70, {
            density: 1,
            frictionAir: 0.02,
            restitution: 0.3,
            friction: 0.9,
            speed: 1,
            render: {
              sprite: {
                texture: `/questionImg/${App.imgSrc}`,
                xScale: 0.583333,
                yScale: 0.583333,
              },
            },
          }),
        ]);
      });

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.6,
          render: {
            visible: false,
          },
        },
      });

    Composite.add(engine.current.world, mouseConstraint);

    render.mouse = mouse;

    Runner.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      Composite.clear(engine.current.world, true);
      Engine.clear(engine.current);
      render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <>
      <div
        ref={scene}
        style={{
          background: `url("../../assets/backgroundPattern.svg")`,
          position: "fixed",
          top: 0,
          // left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
      <div className="relative container px-auto pt-[7.5rem] z-0 pointer-events-none">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-start-2 col-span-6">
            <div className="flex items-center gap-2 mb-8">
              <img src={homeLogo} alt="Ottr Logo" />
              <span className={styles.logoTitle}>Presents</span>
            </div>

            <div className="mb-6">
              <h1 className={styles.Heading}>Cancer Insights Challenge</h1>
            </div>

            <div className="mb-16">
              <p className={styles.description}>
                Test your cancer knowledge and elevate your <br></br>{" "}
                understanding of the disease
              </p>
            </div>

            <div className="flex align-center gap-4 pointer-events-auto">
              <span className="ca-body--sm">Share</span>
              <div className="flex gap-3">
                <a className="cursor-pointer" href="https://www.google.com">
                  <BiLink color={"#470FF4"} size={24} />
                </a>
                <a className="cursor-pointer" href="https://www.linkedin.com">
                  <BiLogoLinkedin color={"#470FF4"} size={24} />
                </a>
                <a className="cursor-pointer" href="https://www.facebook.com">
                  <BiLogoFacebook color={"#470FF4"} size={24} />
                </a>
                <a className="cursor-pointer" href="https://www.discord.com">
                  <BiLogoDiscordAlt color={"#470FF4"} size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
