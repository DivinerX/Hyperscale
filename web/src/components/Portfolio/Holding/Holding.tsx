import { IHolding } from "@/Types";
import { FC } from "react";

export const Holding: FC<{
  activeHoldings: 'list' | 'chart',
  setActiveHoldings: (activeHoldings: 'list' | 'chart') => void,
  holdingList: IHolding[],
  renderPrice: (price: number) => string,
}> = ({ activeHoldings, setActiveHoldings, holdingList, renderPrice }) => {
  return (
    <div className="w-5/12 border border-white/10 flex flex-col h-96">
      <div className="flex flex-col h-full">
        <div className="flex flex-row border-b border-white/10">
          <span className={`text-sm text-white uppercase px-6 py-1 border-r cursor-pointer border-white/10 ${activeHoldings === 'list' ? 'bg-[#171717]' : ''}`} onClick={() => setActiveHoldings('list')}>holdings list</span>
          <span className={`text-sm text-white uppercase px-6 py-1 border-r cursor-pointer border-white/10 ${activeHoldings === 'chart' ? 'bg-[#171717]' : ''}`} onClick={() => setActiveHoldings('chart')}>holdings chart</span>
        </div>
        <div className="flex flex-row gap-2 p-3 border-b border-white/10">
          <input
            type="text"
            className="w-2/5 p-2 bg-[#171717] border border-white/10 text-white"
            placeholder="Search"
          />
          <select className="w-1/5 p-2 bg-[#171717] border border-white/10 text-white">
            <option value="all">All</option>
            <option value="crypto">Crypto</option>
            <option value="stock">Stock</option>
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
              {holdingList.map((holding, index) => (
                <tr className={`border-b border-[#171717] hover:bg-[#464646] cursor-pointer py-2 ${index % 2 === 0 ? 'bg-[#D9D9D905]' : 'bg-[#0C0C0C]'}`} key={index}>
                  <td className="text-sm text-white py-2 pl-2">#{index + 1}</td>
                  <td className="text-sm text-white py-2">{holding.assets}</td>
                  <td className="text-sm text-white py-2">{holding.holding} {holding.assets}</td>
                  <td className="text-sm text-white py-2">{renderPrice(holding.priceUSD)}</td>
                  <td className="text-sm text-white py-2">{renderPrice(holding.priceUSD * holding.holding)}</td>
                  <td className="text-sm text-white py-2">{holding.ROI}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  );
};
