import { FC } from "react";
import { IUser } from "@/Types";

export const Whisper: FC<{ 
  users: IUser[], 
  target: IUser | null, 
  setTarget: (user: IUser) => void, 
  getLastMessage: (user: IUser) => string, 
  getLastMessageTime: (user: IUser) => string, 
  search: string, 
  setSearch: (search: string) => void 
}> = ({ users, target, setTarget, getLastMessage, getLastMessageTime, search, setSearch }) => {
  return (
    <div className="h-full overflow-y-auto border-l-[0.25px] border-[#858585]">
      <div className="h-16 p-4 flex items-center justify-center border-b-[0.25px] border-[#858585]">
        <input
          type="text"
          className="w-full text-xs p-2 bg-[#1d1d1d] text-white outline-none border-[0.25px] border-[#858585]" 
          placeholder="CLICK HERE TO SEARCH"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          />
      </div>
      <div>
        {users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase())).map((user) => (
          <div key={user.id} className={`flex items-center justify-between px-4 py-2 h-14 border-b-[0.25px] border-[#4d4d4d] hover:cursor-pointer ${user.id === target?.id ? 'bg-[#1d1d1d]' : ''}`} onClick={() => setTarget(user)}>
            <div className="flex items-center justify-center gap-2">
              <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-sm" />
              <div className="flex flex-col">
                <span className="text-xs">@{user.username}</span>
                <span className="text-xs">{getLastMessage(user)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-xs">{getLastMessageTime(user)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};