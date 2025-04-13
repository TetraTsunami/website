"use client";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import textStyles from "../styles/text.module.scss";

interface IconButtonRowProps {
  icon: IconDefinition;
  rel?: string;
  href: string;
  title: string;
}

export default function IconButtonRowLg({
  buttons,
}: {
  buttons: IconButtonRowProps[];
}) {
  // Buttons is an array of objects with the following properties:
  // {
  //     icon: FontAwesomeIcon,
  //     href: string,
  //     name: string,
  // }
  return (
    <ul className="mx-4 my-2 flex flex-row items-center justify-between">
      {buttons.map((button: IconButtonRowProps, index: number) => (
        <li key={index} className="relative text-center">
          <a
            rel={button.rel}
            href={button.href}
            className={`px-3 py-2 ${textStyles["pastelTextHover"]}`}
            style={
              {
                "--data-degree": (index * 360) / buttons.length,
              } as React.CSSProperties
            }
          >
            <FontAwesomeIcon icon={button.icon} size={"xl" as SizeProp} />
            <p className="visible-hidden">{button.title}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
