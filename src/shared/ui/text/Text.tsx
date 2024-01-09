import { ElementType, ReactNode } from "react";
type Variant = "p" | "list" | "lead" | "large" | "small" | "muted";

interface Props {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  p: "p",
  list: "ul",
  lead: "p",
  large: "span",
  small: "small",
  muted: "p",
};

const styles: Record<Variant, string> = {
  p: "leading-7 [&:not(:first-child)]:mt-6",
  list: "my-6 ml-6 list-disc [&>li]:mt-2",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

export const Text = ({ variant = "p", children, className, as }: Props) => {
  const styleClasses = styles[variant];
  const Tag = as || tags[variant];

  return <Tag className={`${styleClasses} ${className}`}>{children}</Tag>;
};
