import { FC, useState } from "react";
import { Holding } from "./Holding";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const HoldingContainer: FC = () => {
  const [activeHoldings, setActiveHoldings] = useState<'list' | 'chart'>('list')
  const [searchHolding, setSearchHolding] = useState<string>('');
  const [sortBy, setSortBy] = useState<'assets' | 'value' | 'price' | 'ROI'>('value');
  const coinInfos = useSelector((state: RootState) => state.coin.coinInfos);

  return (
    <Holding
      activeHoldings={activeHoldings}
      setActiveHoldings={setActiveHoldings}
      coinInfos={coinInfos}
      searchHolding={searchHolding}
      setSearchHolding={setSearchHolding}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};
