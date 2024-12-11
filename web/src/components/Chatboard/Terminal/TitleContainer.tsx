import { FC, useState } from "react";
import { Terminal } from "./Terminal";

export const TerminalContainer: FC = () => {
  const [terminal] = useState<string>("GLOBAL");
  return (
    <Terminal terminal={terminal}/>
  );
};

