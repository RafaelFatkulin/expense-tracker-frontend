import { ElementType, ReactNode } from "react";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5";

interface Props {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
};

const styles: Record<Variant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-18 text-lg font-semibold tracking-tight",
};

export const Heading = ({ variant = "h1", children, className, as }: Props) => {
  const styleClasses = styles[variant];
  const Tag = as || tags[variant];

  return <Tag className={`${styleClasses} ${className}`}>{children}</Tag>;
};
