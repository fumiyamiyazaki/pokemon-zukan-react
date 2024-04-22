import { FC } from "react";

type Props = {
  text: string;
};

export const Button: FC<Props> = ({ text }) => {
  return (
    <>
      <button className="text-red-700 md:text-blue-700 p-5">{text}</button>
    </>
  );
};
