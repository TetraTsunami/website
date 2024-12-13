"use client";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy, { useSingleton } from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import textStyles from "../styles/text.module.scss";

interface IconButtonRowProps {
  icon: IconDefinition;
  href: string;
  title: string;
}
const fadeUpDelay = (i: number) => ({ animationDelay: i * 0.1 + 1 + "s" });
export default function IconButtonRowLg({
  buttons,
  animate,
  animateDelay,
}: {
  buttons: IconButtonRowProps[];
  animate: boolean;
  animateDelay: number;
}) {
  const [source, target] = useSingleton();
  // Buttons is an array of objects with the following properties:
  // {
  //     icon: FontAwesomeIcon,
  //     href: string,
  //     name: string,
  // }
  return (
    <ul className="m-2 flex flex-row items-center justify-between">
      <Tippy
        singleton={source}
        theme="material"
        placement="bottom"
        moveTransition="transform 0.1s cubic-bezier(.17,.67,.83,.67)"
      />
      {buttons.map((button: IconButtonRowProps, index: number) => (
        <li key={index} className="relative text-center">
          <Tippy content={button.title} singleton={target}>
            <a
              href={button.href}
              className={`px-3 py-2 ${animate ? textStyles["animateFadeUp"] : "motion-safe:opacity-0"}`}
              style={fadeUpDelay(index + animateDelay)}
            >
              <FontAwesomeIcon icon={button.icon} size={"xl" as SizeProp} />
              <p className="visible-hidden">{button.title}</p>
            </a>
          </Tippy>
        </li>
      ))}
    </ul>
  );
}
