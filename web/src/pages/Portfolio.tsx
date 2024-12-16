import { GraphContainer } from '@/components/Portfolio/Graph/GraphContainer';
import { HoldingContainer } from '@/components/Portfolio/Holding/HoldingContainer';
import { StatisticContainer } from '@/components/Portfolio/Statistic/StatisticContainer';
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
  }, [])
  
  return (
    <WithHeader>
      <TerminalContainer />
      <div className="p-8 flex flex-col gap-4 w-full">
        <StatisticContainer />
        <div className="flex flex-row gap-4 w-full">
          <GraphContainer />
          <HoldingContainer />
        </div>
      </div>
    </WithHeader>
  )
};