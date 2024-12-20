import { MessageBoardContainer } from '@/components/Chatboard/MessageBoard/MessageBoardContainer';
import { WhisperContainer } from '@/components/Chatboard/Whisper/WhisperContainer';
import { TerminalContainer } from '@/components/Terminal/TerminalContainer';
import { WithHeader } from '@/components/WithHeader';
import { AppDispatch, RootState } from '@/store';
import { setMode } from '@/store/slices/userSlice';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ChatboardPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootState) => state.user.mode);

  useEffect(() => {
    dispatch(setMode('GLOBAL'));
  }, [dispatch]);

  return (
    <WithHeader>
      <div className={`flex flex-row h-full w-full`}>
        <div className={`flex flex-col h-full overflow-y-auto ${mode === 'WHISPER' ? 'w-3/4' : 'w-full'}`}>
          <TerminalContainer />
          <MessageBoardContainer />
        </div>
        {
          mode === 'WHISPER' && <div className="flex flex-col w-1/4 h-full overflow-y-auto">
            <WhisperContainer />
          </div>
        }
      </div>
    </WithHeader>
  )
};