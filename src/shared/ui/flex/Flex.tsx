import { ElementType, ReactNode } from "react";

type Direction = "row" | "row-reverse" | "col" | "col-reverse";
type Align = "start" | "end" | "center" | "baseline" | "stretch";
type Justify =
  | "normal"
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"
  | "stretch";
type Wrap = "wrap" | "wrap-reverse" | "nowrap";
type Gap = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

interface Props {
  as?: ElementType;
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
  gap?: Gap;
  children?: ReactNode | null;
}

const directionStyles: Record<Direction, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
};
const alignStyles: Record<Align, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};
const justifyStyles: Record<Justify, string> = {
  normal: "justify-normal",
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
  stretch: "justify-stretch",
};
const wrapStyles: Record<Wrap, string> = {
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
  nowrap: "flex-no-wrap",
};
const gapStyles: Record<Gap, string> = {
  "0": "gap-0",
  "1": "gap-1 md:gap-1.5 lg:gap-2",
  "2": "gap-2 md:gap-3 lg:gap-4",
  "3": "gap-3 md:gap-4 lg:gap-5",
  "4": "gap-4 md:gap-5 lg:gap-6",
  "5": "gap-5 md:gap-6 lg:gap-7",
  "6": "gap-6 md:gap-7 lg:gap-8",
  "7": "gap-7 md:gap-6 lg:gap-8",
  "8": "gap-8 md:gap-9 lg:gap-10",
};

export const Flex = ({
  as = "div",
  direction = "row",
  align = "start",
  justify = "start",
  wrap = "wrap",
  gap = "1",
  children,
}: Props) => {
  const Tag = as;
  const directionClasses = directionStyles[direction];
  const alignClasses = alignStyles[align];
  const justifyClasses = justifyStyles[justify];
  const wrapClasses = wrapStyles[wrap];
  const gapClasses = gapStyles[gap];

  return (
    <Tag
      className={`flex ${directionClasses} ${alignClasses} ${justifyClasses} ${wrapClasses} ${gapClasses}`}
    >
      {children}
    </Tag>
  );
};
