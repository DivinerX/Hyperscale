import { renderNumber } from "@/services/renderNumber";
import { FC } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

export const Statistic: FC<{
  netWorth: number;
  realWorldInvestment: number;
  lifetimeReturns: number;
  lifetimeReturnsPercentage: number;
  lifetimeReturnsTrend: 'up' | 'down';
}> = ({ netWorth, realWorldInvestment, lifetimeReturns, lifetimeReturnsPercentage, lifetimeReturnsTrend }) => {
  return (
    <div className="flex flex-row w-full border border-[#474747] p-3 items-center">
      <div className="flex flex-col">
        <span className="text-xs text-[#808080] uppercase">net worth</span>
        <span className="text-xl">${renderNumber(netWorth)}</span>
      </div>
      <div className="h-10 w-[1px] bg-white/30 mx-4"></div>
      <div className="flex flex-col">
        <span className="text-xs   text-[#808080] uppercase">real-world investment</span>
        <span className="text-xl">${renderNumber(realWorldInvestment)}</span>
      </div>
      <div className="flex flex-col ml-4 justify-between">
        <span className="text-xs text-[#808080] uppercase pb-[2px]">lifetime returns</span>
        <div className="flex flex-row items-center">
          <div className={`border ${lifetimeReturnsTrend === 'up' ? 'border-[#76FF36]' : 'border-red-500'} bg-[#11D3270D] rounded-full py-1 px-2 flex items-center justify-center`}>
            {lifetimeReturnsTrend === 'up' ?
              <>
                <TbTriangleFilled className="text-[#76FF36]" />
                <span className="text-[#76FF36] text-xs">{renderNumber(lifetimeReturnsPercentage)}%</span>
              </>
              :
              <>
                <TbTriangleInvertedFilled className="text-red-500" />
                <span className="text-red-500 text-xs">{renderNumber(lifetimeReturnsPercentage)}%</span>
              </>
            }

          </div>
          <span
            className={`text-xs ${lifetimeReturnsTrend === 'up' ? 'text-[#76FF36]' : 'text-red-500'} uppercase pl-2`}
          >
            {lifetimeReturns < 0 ? `-$${renderNumber(Math.abs(lifetimeReturns))}` : `+$${renderNumber(lifetimeReturns)}`}
          </span>
        </div>
      </div>
      <div className="h-10 w-[1px] bg-white/30 mx-4"></div>
    </div>
  )
};  