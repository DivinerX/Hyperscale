import { FC } from "react";
import { TerminalContainer } from "../Terminal/TerminalContainer";
import { MessageInputContainer } from "../MessageInput/MessageInputContainer";
import { StatisticContainer } from "./Statistic/StatisticContainer";
import { GraphContainer } from "./Graph/GraphContainer";
import { HoldingContainer } from "./Holding/HoldingContainer";

export const Portfolio: FC = () => {

  return (
    <div className="flex flex-row w-full h-full">
      <div className={`flex flex-col h-[calc(100%-5rem)] overflow-y-auto w-full`}>
        <TerminalContainer />
        <div className="p-8 flex flex-col gap-4 w-full">
          <StatisticContainer />
          <div className="flex flex-row gap-4 w-full">
            <GraphContainer />
            <HoldingContainer />
          </div>
        </div>
        <MessageInputContainer />
      </div>
    </div>
  );
};
