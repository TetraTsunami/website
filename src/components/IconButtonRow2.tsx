"use client";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import textStyles from "../styles/text.module.css";

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
  // Buttons is an array of objects with the following properties:
  // {
  //     icon: FontAwesomeIcon,
  //     href: string,
  //     name: string,
  // }
  return (
    <ul className="m-2 flex flex-row items-center justify-between">
      {buttons.map((button: IconButtonRowProps, index: number) => (
        <li key={index} className="relative text-center">
          <a
            href={button.href}
            className={`px-3 py-2 ${animate ? textStyles["animateFadeUp"] : "motion-safe:opacity-0"}`}
            style={fadeUpDelay(index + animateDelay)}
          >
            <FontAwesomeIcon icon={button.icon} size={"xl" as SizeProp} />
            <p className="visible-hidden">{button.title}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
