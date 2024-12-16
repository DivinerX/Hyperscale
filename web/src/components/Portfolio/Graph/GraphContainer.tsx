import { FC, useState } from "react";
import { Graph } from "./Graph";

export const GraphContainer: FC = () => {
  const [activeGraph, setActiveGraph] = useState<'total_holdings' | 'net_worth'>('total_holdings');
  const [netWorth] = useState<number>(0);
  const [trending] = useState<'up' | 'down'>('up');
  const [netWorthPercentage] = useState<number>(0);
  const [timePeriod, setTimePeriod] = useState<'1 Year' | '1 Month' | '1 Week' | '1 Day'>('1 Year');

  return (
    <Graph
      activeGraph={activeGraph}
      setActiveGraph={setActiveGraph}
      netWorth={netWorth}
      trending={trending}
      netWorthPercentage={netWorthPercentage}
      timePeriod={timePeriod}
      setTimePeriod={setTimePeriod}
    />
  );
};
