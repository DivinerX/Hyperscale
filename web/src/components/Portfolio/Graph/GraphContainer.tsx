import { FC, useEffect, useState } from "react";
import { Graph } from "./Graph";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getGraphData, setTimePeriod } from "@/store/slices/coinSlice";

export const GraphContainer: FC = () => {
  const [activeGraph, setActiveGraph] = useState<'total_holdings' | 'net_worth'>('total_holdings');
  const timePeriod = useSelector((state: RootState) => state.coin.timePeriod);
  const dispatch = useDispatch<AppDispatch>();

  const coinInfos = useSelector((state: RootState) => state.coin.coinInfos);
  const netWorth = coinInfos.reduce((acc, coin) => acc + coin.price * coin.amount, 0);
  const realWorldInvestment = coinInfos.reduce((acc, coin) => acc + coin.cost, 0);
  const interest = netWorth - realWorldInvestment;
  const netWorthPercentage = interest / realWorldInvestment * 100;
  const trending: 'up' | 'down' = netWorthPercentage > 0 ? 'up' : 'down';
  const historicalData = useSelector((state: RootState) => state.coin.historicalData);
  const loading = useSelector((state: RootState) => state.coin.loading);

  const setTimePeriodHandler = (timePeriod: '1 Year' | '1 Month' | '1 Week' | '1 Day') => {
    dispatch(setTimePeriod(timePeriod));
  };

  useEffect(() => {
    if (coinInfos.length > 0) {
      const days = timePeriod === '1 Year' ? 365 : timePeriod === '1 Month' ? 30 : timePeriod === '1 Week' ? 7 : 1;
      dispatch(getGraphData({ days, coinInfos }))
    }
  }, [dispatch, coinInfos, timePeriod]);

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
      setTimePeriod={setTimePeriodHandler}
      loading={loading}
    />
  );
};
