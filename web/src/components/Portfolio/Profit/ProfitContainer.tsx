import { FC } from "react";
import { Profit } from "./Profit";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const ProfitContainer: FC = () => {
  const historicalData = useSelector((state: RootState) => state.coin.historicalData)
  const coinInfos = useSelector((state: RootState) => state.coin.coinInfos)
  const invest = coinInfos.reduce((acc, coin) => acc + coin.cost, 0);
  const timePeriod = useSelector((state: RootState) => state.coin.timePeriod);
  return (
    <Profit historicalData={historicalData} invest={invest} timePeriod={timePeriod} />
  );
};