"use client";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import textStyles from "@/styles/text.module.scss";
import IconButtonRow2 from "@/components/IconButtonRow2";

const fadeUpDelay = (i: number) => ({
  animationDelay: (i * 0.1) + 1 + "s"
});

export default function HomeHeader() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);
  return (
    <section
      id="home"
      className="container relative mx-auto flex h-[70vh] flex-col items-center justify-center p-8 text-center"
    >
      <h2 className="text-4xl font-semibold">
        <span
          className={animate ? textStyles["animateFadeUp"] : "opacity-0"}
          style={fadeUpDelay(0)}
        >
          Hello
        </span>{" "}
        <span
          className={animate ? textStyles["animateFadeUp"] : "opacity-0"}
          style={fadeUpDelay(1)}
        >
          world!
        </span>
      </h2>
      <h1
        className={`text-8xl font-extrabold text-transparent ${textStyles.gradientTitleText}`}
      >
        <span
          className={animate ? textStyles["animateFadeUp"] : "opacity-0"}
          style={fadeUpDelay(5)}
        >
          I{"'"}m
        </span>{" "}
        <span
          className={animate ? textStyles["animateFadeUp"] : "opacity-0"}
          style={fadeUpDelay(6)}
        >
          Tsuni!
        </span>
      </h1>

      <IconButtonRow2
        buttons={[
          {
            icon: faEnvelope,
            href: "mailto:tsuni@[this domain]",
            title: "tsuni@[this domain]",
          },
          {
            icon: faGithub,
            href: "https://github.com/TetraTsunami",
            title: "TetraTsunami",
          },
          {
            icon: faTwitter,
            href: "https://twitter.com/tsuniHD",
            title: "@tsuniHD",
          },
        ]}
        animate={animate}
        animateDelay={7}
      />
    </section>
  );
}
