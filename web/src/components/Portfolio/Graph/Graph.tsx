import { renderNumber } from "@/services/renderNumber";
import { FC } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

export const Graph: FC<{
  activeGraph: 'total_holdings' | 'net_worth',
  netWorth: number,
  trending: 'up' | 'down',
  setActiveGraph: (activeGraph: 'total_holdings' | 'net_worth') => void,
  netWorthPercentage: number,
  timePeriod: '1 Year' | '1 Month' | '1 Week' | '1 Day',
  setTimePeriod: (timePeriod: '1 Year' | '1 Month' | '1 Week' | '1 Day') => void,
}> = ({ activeGraph, setActiveGraph, netWorth, trending, netWorthPercentage, timePeriod, setTimePeriod }) => {
  return (
    <div className="w-7/12 h-[450px] flex flex-col border border-white/10">
      <div className="flex flex-row border-b border-white/10">
        <span className={`text-sm text-white uppercase px-6 py-1 border-r cursor-pointer border-white/10 ${activeGraph === 'total_holdings' ? 'bg-[#171717]' : ''}`} onClick={() => setActiveGraph('total_holdings')}>total holdings</span>
        <span className={`text-sm text-white uppercase px-6 py-1 border-r cursor-pointer border-white/10 ${activeGraph === 'net_worth' ? 'bg-[#171717]' : ''}`} onClick={() => setActiveGraph('net_worth')}>net worth</span>
      </div>
      <div className="flex flex-row justify-between px-4 border-b border-white/10 py-1">
        <div>
          <span className="text-xs text-[#808080] uppercase">net worth</span>
          <div className="flex flex-row items-center gap-2">
            <span className="text-xl">${renderNumber(netWorth)}</span>
            <div className={`border ${trending === 'up' ? 'border-[#76FF36]' : 'border-[#FF3636]'} bg-[#11D3270D] rounded-full py-1 px-2 flex items-center justify-center`}>
              {trending === 'up' ?
                <>
                  <TbTriangleFilled className="text-[#76FF36]" />
                  <span className="text-[#76FF36] text-xs">{renderNumber(netWorthPercentage)}%</span>
                </>
                :
                <>
                  <TbTriangleInvertedFilled className="text-[#FF3636]" />
                  <span className="text-[#FF3636] text-xs">{renderNumber(netWorthPercentage)}%</span>
                </>
              }

            </div>
            <span
              className={`text-xs ${trending === 'up' ? 'text-[#76FF36]' : 'text-[#FF3636]'} uppercase pl-2`}
            >
              ${renderNumber(netWorth)}
            </span>
          </div>
        </div>
        <div>
          <span className="text-xs text-[#808080] uppercase">time period</span>
          <div>
            <select
              className="bg-[#171717] border border-white/10 rounded-full px-2 py-[2px] text-white text-sm"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value as '1 Year' | '1 Month' | '1 Week' | '1 Day')}
            >
              <option value="1 Year">1 Year</option>
              <option value="1 Month">1 Month</option>
              <option value="1 Week">1 Week</option>
              <option value="1 Day">1 Day</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
