import { FC, useEffect } from "react";
import { Statistic } from "./Statistic";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getCoinInfo } from "@/store/slices/coinSlice";

export const StatisticContainer: FC = () => {
  const coinInfos = useSelector((state: RootState) => state.coin.coinInfos);
  const dispatch = useDispatch<AppDispatch>();

  const netWorth: number = coinInfos.reduce((acc, coin) => acc + coin.price * coin.amount, 0);
  const realWorldInvestment: number = coinInfos.reduce((acc, coin) => acc + coin.cost, 0);
  const lifetimeReturns: number = netWorth - realWorldInvestment;
  const lifetimeReturnsPercentage: number = lifetimeReturns / realWorldInvestment * 100 || 0;
  const lifetimeReturnsTrend: 'up' | 'down' = lifetimeReturns > 0 ? 'up' : 'down';
  const loading = useSelector((state: RootState) => state.coin.loading);

  useEffect(() => {
    dispatch(getCoinInfo());
  }, [dispatch]);

  return (
    <Statistic 
      netWorth={netWorth}
      realWorldInvestment={realWorldInvestment}
      lifetimeReturns={lifetimeReturns}
      lifetimeReturnsPercentage={lifetimeReturnsPercentage}
      lifetimeReturnsTrend={lifetimeReturnsTrend}
      loading={loading}
    />
  )
};