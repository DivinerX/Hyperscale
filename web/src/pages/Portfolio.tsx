import { GraphContainer } from '@/components/Portfolio/Graph/GraphContainer';
import { HoldingContainer } from '@/components/Portfolio/Holding/HoldingContainer';
import { ProfitContainer } from '@/components/Portfolio/Profit/ProfitContainer';
import { StatisticContainer } from '@/components/Portfolio/Statistic/StatisticContainer';
import { TradingContainer } from '@/components/Portfolio/Trading/TradingContainer';
import { TerminalContainer } from '@/components/Terminal/TerminalContainer';
import { WithHeader } from '@/components/WithHeader';
import { AppDispatch } from '@/store';
import { setMode } from '@/store/slices/userSlice';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const PortfolioPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(setMode('PORTFOLIO'))
  }, [dispatch])

  return (
    <WithHeader>
      <TerminalContainer />
      <div className="p-8 flex flex-col gap-4 w-full">
        <StatisticContainer />
        <div className="flex flex-row gap-4 w-full">
          <GraphContainer />
          <HoldingContainer />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <TradingContainer />
          <ProfitContainer />
        </div>
      </div>
    </WithHeader>
  )
};