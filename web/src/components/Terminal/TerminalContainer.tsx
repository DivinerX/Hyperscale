import { FC } from "react";
import { Terminal } from "./Terminal";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const TerminalContainer: FC = () => {
  const mode = useSelector((state: RootState) => state.user.mode);
  return (
    <Terminal mode={mode}/>
  );
};

