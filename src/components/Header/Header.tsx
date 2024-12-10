import { FC } from "react";
import logo from "../../assets/logo.svg";
import verified from "../../assets/verified.svg";
import avatar from "/avatar.png"

export const Header: FC = () => {
  return (
    <header className="bg-black text-white px-2 py-2 flex justify-between items-center text-xs border-b-[0.25px] border-[#858585]">
      <div className="flex gap-2">
        <div className="flex items-center justify-center pl-1">
          <img src={logo} alt="logo" className="w-8 h-8" />
        </div>
        <div className="h-10 w-[1px] bg-white/30 mx-2"></div>
        <div className="flex flex-col justify-center">
          <span className="text-[#8D8D8D]">{new Date().toISOString().split('T')[0]}</span>
          <span className="text-[#8D8D8D]">{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>
        <div className="flex flex-col justify-center px-3">
          <span className="text-[#8D8D8D]">USER: ONLINE</span>
          <span className="flex items-center gap-1"><div className="w-[5px] h-[5px] rounded-full bg-green-500"></div> {24}/{64}</span>
        </div>
        <div className="h-10 w-[1px] bg-white/30 mx-2"></div>
        <div className="flex flex-col justify-center">
          <span className="text-[#8D8D8D]">BUILT</span>
          <span className="text-[#8D8D8D]">{`2023-11-02 20:35`}</span>
        </div>
        <div className="flex flex-col justify-center px-3">
          <span className="text-[#8D8D8D]">BUILD MODEL</span>
          <span>{`v.0.0.1`}</span>
        </div>
      </div>
      {/* right side of the header */}
      <div className="flex items-center gap-1">
        <div className="flex flex-col justify-center items-end px-3">
          <span className="text-[#8D8D8D] uppercase">logged in as</span>
          <span className="flex items-center gap-1">{`@solamimaxi`} <img src={verified} alt="verified" className="w-4 h-4" /></span>
        </div>
        <div>
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-sm" />
        </div>
      </div>
    </header>
  );
};