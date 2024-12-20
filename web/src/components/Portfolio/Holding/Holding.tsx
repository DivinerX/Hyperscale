import { renderPrice } from "@/services/renderNumber";
import { ICoinInfo } from "@/Types";
import { FC } from "react";

export const Holding: FC<{
  activeHoldings: 'list' | 'chart',
  setActiveHoldings: (activeHoldings: 'list' | 'chart') => void,
  coinInfos: ICoinInfo[],
  searchHolding: string,
  setSearchHolding: (searchHolding: string) => void,
  sortBy: 'assets' | 'value' | 'price' | 'ROI',
  setSortBy: (sortBy: 'assets' | 'value' | 'price' | 'ROI') => void,
}> = ({
  activeHoldings, setActiveHoldings, coinInfos, searchHolding, setSearchHolding, sortBy, setSortBy
}) => {
    return (
      <div className="w-5/12 border border-white/10 flex flex-col h-[450px]">
        <div className="flex flex-col h-full">
          <div className="flex flex-row border-b border-white/10">
            <span className={`text-sm text-white uppercase px-6 py-1 border-r cursor-pointer border-white/10 ${activeHoldings === 'list' ? 'bg-[#171717]' : ''}`} onClick={() => setActiveHoldings('list')}>holdings list</span>
            <span className={`text-sm text-white uppercase px-6 py-1 border-r cursor-pointer border-white/10 ${activeHoldings === 'chart' ? 'bg-[#171717]' : ''}`} onClick={() => setActiveHoldings('chart')}>holdings chart</span>
          </div>
          <div className="flex flex-row gap-2 p-3 border-b border-white/10">
            <input
              type="text"
              className="w-2/5 px-2 py-1 bg-[#171717] border border-white/10 text-white text-sm"
              placeholder="Search"
              value={searchHolding}
              onChange={(e) => setSearchHolding(e.target.value)}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'assets' | 'value' | 'price' | 'ROI')}
              className="w-1/5 px-2 py-1 bg-[#171717] border border-white/10 text-white text-sm"
            >
              <option value="value">Value</option>
              <option value="assets">Assets</option>
              <option value="price">Price</option>
              <option value="ROI">ROI</option>
            </select>
          </div>
          {activeHoldings === 'list' && <div className="flex flex-col h-full overflow-y-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-sm font-normal uppercase text-[#858585] text-left py-2 pl-2"></th>
                  <th className="text-sm font-normal uppercase text-[#858585] text-left py-2">Assets</th>
                  <th className="text-sm font-normal uppercase text-[#858585] text-left py-2">Holding</th>
                  <th className="text-sm font-normal uppercase text-[#858585] text-left py-2">Price USD</th>
                  <th className="text-sm font-normal uppercase text-[#858585] text-left py-2">Value USD</th>
                  <th className="text-sm font-normal uppercase text-[#858585] text-left py-2">ROI</th>
                </tr>
              </thead>
              <tbody>
                {coinInfos.filter((coin) =>
                  coin.symbol.toLowerCase().includes(searchHolding.toLowerCase())
                ).sort((a, b) => {
                  if (sortBy === 'assets') return a.symbol.localeCompare(b.symbol);
                  if (sortBy === 'value') return b.price * b.amount - a.price * a.amount;
                  if (sortBy === 'price') return b.price - a.price;
                    if (sortBy === 'ROI') return (b.ROI || 0) - (a.ROI || 0);
                    return 0;
                  }).map((coin, index) => (
                    <tr className={`border-b border-[#171717] hover:bg-[#464646] cursor-pointer py-2 ${index % 2 === 0 ? 'bg-[#D9D9D905]' : 'bg-[#0C0C0C]'}`} key={index}>
                      <td className="text-xs text-white/50 py-2 pl-2">#{index + 1}</td>
                      <td className="text-xs text-white py-2 flex flex-row items-center gap-1 uppercase"><img src={coin.image || ''} alt={coin.symbol} className="rounded-full w-6 h-6" /> {coin.symbol}</td>
                      <td className="text-xs text-white py-2">{coin.amount} <span className="text-xs text-[#808080] uppercase">{coin.symbol}</span></td>
                      <td className="text-xs text-white py-2">${renderPrice(coin.price)}</td>
                      <td className="text-xs text-white py-2">${renderPrice(coin.price * coin.amount)}</td>
                      <td className={`text-xs py-2 ${coin.ROI && coin.ROI > 0 ? 'text-[#76FF36]' : 'text-[#FF3636]'}`}>{coin.ROI === undefined ? '-' : `${(coin.ROI * 100).toFixed(3)}%`}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>}
        </div>
      </div>
    );
  };
