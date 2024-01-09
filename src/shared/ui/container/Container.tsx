import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return <div className="px-4 max-w-[90rem] m-auto">{children}</div>;
};
