import { FC, useEffect } from "react";
import { Statistic } from "./Statistic";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getCoinInfo } from "@/store/slices/coinSlice";

export const StatisticContainer: FC = () => {
  const coinInfo = useSelector((state: RootState) => state.coin.coinInfo);
  const dispatch = useDispatch<AppDispatch>();

  const netWorth = coinInfo.reduce((acc, coin) => acc + coin.price * coin.amount, 0);
  const realWorldInvestment = coinInfo.reduce((acc, coin) => acc + coin.price * coin.amount, 0);
  const lifetimeReturns = coinInfo.reduce((acc, coin) => acc + coin.ROI * coin.amount * coin.price / 100, 0);
  const lifetimeReturnsPercentage = coinInfo.reduce((acc, coin) => acc + coin.ROI * coin.amount * coin.price / 100, 0) / realWorldInvestment * 100;
  const lifetimeReturnsTrend: 'up' | 'down' = lifetimeReturns > 0 ? 'up' : 'down';

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
    />
  )
};