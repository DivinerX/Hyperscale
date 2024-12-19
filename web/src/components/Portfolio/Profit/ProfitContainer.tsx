import { FC } from "react";
import { Profit } from "./Profit";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const ProfitContainer: FC = () => {
  const historicalData = useSelector((state: RootState) => state.coin.historicalData)
  const invest = useSelector((state: RootState) => state.coin.invest)
  return (
    <Profit historicalData={historicalData} invest={invest} />
  );
};