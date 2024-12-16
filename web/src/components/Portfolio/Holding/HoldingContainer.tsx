import { FC, useEffect, useState } from "react";
import { Holding } from "./Holding";
import { IHolding } from "@/Types";

interface ICoinInfo {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export const HoldingContainer: FC = () => {
  const [activeHoldings, setActiveHoldings] = useState<'list' | 'chart'>('list')
  const [searchHolding, setSearchHolding] = useState<string>('');
  const [sortBy, setSortBy] = useState<'assets' | 'value' | 'price' | 'ROI'>('value');

  const [holdingList, setHoldingList] = useState<IHolding[]>([
    {
      assets: 'BTC',
      holding: 250,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'ETH',
      holding: 3200,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'SOL',
      holding: 1250,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'XRP',
      holding: 2000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'ADA',
      holding: 15000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'LINK',
      holding: 500000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'DOT',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'XMR',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'UNI',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'ATOM',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'FTM',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'ENA',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'TIA',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'GRT',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'WLD',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'BLUR',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'TRX',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'LDO',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'MKR',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
    {
      assets: 'HNT',
      holding: 1000000,
      price: 10000,
      ROI: null,
      image: null
    },
  ])
  const renderPrice = (price: number) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  useEffect(() => {
    const fetchCoinInfo = async () => {
      const coinInfo = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&locale=en&per_page=200");
      const data = await coinInfo.json();
      console.log(data)
      const holdingListTemp = [...holdingList];
      holdingListTemp.forEach((holding) => {
        const coin = data.find((coin: ICoinInfo) => coin.symbol.toLowerCase() === holding.assets.toLowerCase());
        if (coin) {
          holding.price = coin.current_price;
          holding.ROI = coin.price_change_percentage_24h;
          holding.image = coin.image;
        }
      })
      setHoldingList(holdingListTemp);
    }
    fetchCoinInfo();
  }, []);

  return (
    <Holding
      activeHoldings={activeHoldings}
      setActiveHoldings={setActiveHoldings}
      holdingList={holdingList}
      renderPrice={renderPrice}
      searchHolding={searchHolding}
      setSearchHolding={setSearchHolding}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};
