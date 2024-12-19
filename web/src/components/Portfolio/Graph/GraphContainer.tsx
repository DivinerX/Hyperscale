import { FC, useState } from "react";
import { Graph } from "./Graph";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const GraphContainer: FC = () => {
  const [activeGraph, setActiveGraph] = useState<'total_holdings' | 'net_worth'>('total_holdings');
  const [timePeriod, setTimePeriod] = useState<'1 Year' | '1 Month' | '1 Week' | '1 Day'>('1 Year');

  const coinInfo = useSelector((state: RootState) => state.coin.coinInfo);
  const netWorth = coinInfo.reduce((acc, coin) => acc + coin.price * coin.amount, 0);
  const netWorthPercentage = coinInfo.reduce((acc, coin) => acc + coin.ROI * coin.amount * coin.price / 100, 0) / netWorth * 100;
  const trending: 'up' | 'down' = netWorthPercentage > 0 ? 'up' : 'down';
  const interest = coinInfo.reduce((acc, coin) => acc + coin.ROI * coin.amount * coin.price / 100, 0);
  const historicalData = useSelector((state: RootState) => state.coin.historicalData);

  // useEffect(() => {
  //   if (coinInfo.length > 0) {
  //     dispatch(getGraphData({ name: coinInfo[0].id, days: 30 }))
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }, [dispatch, coinInfo]);

  return (
    <Graph
      activeGraph={activeGraph}
      setActiveGraph={setActiveGraph}
      netWorth={netWorth}
      interest={interest}
      trending={trending}
      netWorthPercentage={netWorthPercentage}
      historicalData={historicalData}
      timePeriod={timePeriod}
      setTimePeriod={setTimePeriod}
    />
  );
};
