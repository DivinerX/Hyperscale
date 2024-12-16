import { FC, useEffect, useState } from "react";
import { Holding } from "./Holding";
import { IHolding } from "@/Types";
import bybitService from "@/services/bybitService";

export const HoldingContainer: FC = () => {
  const [activeHoldings, setActiveHoldings] = useState<'list' | 'chart'>('list')


  const [holdingList, setHoldingList] = useState<IHolding[]>([
    {
      assets: 'BTC',
      holding: 250,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'ETH',
      holding: 3200,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'SOL',
      holding: 1250,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'XRP',
      holding: 2000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'ADA',
      holding: 15000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'LINK',
      holding: 500000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'DOT',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'XMR',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'UNI',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'ATOM',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'FTM',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'ENA',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'TIA',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'GRT',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'WLD',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'BLUR',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'BLAST',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'LDO',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'MKR',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
    {
      assets: 'HNT',
      holding: 1000000,
      priceUSD: 10000,
      ROI: 100
    },
  ])
  const renderPrice = (price: number) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await Promise.all(
        holdingList.map(holding =>
          bybitService
            .getCoinPrice(holding.assets)
            .then(price =>
              ({ ...holding, priceUSD: Number(price) })
            )
            .catch(error => {
              console.error('Error fetching coin price:', error);
              return holding;
            })
        )
      );
      console.log(prices)
      setHoldingList(prices);
    };
    fetchPrices();
  }, []);

  return (
    <Holding activeHoldings={activeHoldings} setActiveHoldings={setActiveHoldings} holdingList={holdingList} renderPrice={renderPrice} />
  );
};
