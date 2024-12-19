import { FC, useEffect, useState } from "react";
import { Holding } from "./Holding";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
// import { getCoinInfo } from "@/store/slices/coinSlice";

export const HoldingContainer: FC = () => {
  const [activeHoldings, setActiveHoldings] = useState<'list' | 'chart'>('list')
  const [searchHolding, setSearchHolding] = useState<string>('');
  const [sortBy, setSortBy] = useState<'assets' | 'value' | 'price' | 'ROI'>('value');
  const coinInfo = useSelector((state: RootState) => state.coin.coinInfo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (coinInfo.length === 0) {
      // dispatch(getCoinInfo())
    }
  }, [dispatch, coinInfo]);

  return (
    <Holding
      activeHoldings={activeHoldings}
      setActiveHoldings={setActiveHoldings}
      coinInfo={coinInfo}
      searchHolding={searchHolding}
      setSearchHolding={setSearchHolding}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};
