import { FC } from "react";

export const Terminal: FC<{mode: string}> = ({mode}) => {
  return (
    <div className="px-4 py-2 bg-[#8C8C8C1A] text-xs font-medium border-b-[0.25px] border-[#858585]">
      <span className="text-[#858585]">HYPERSRCALE_TERMINAL / </span>
      <span className="text-white">{mode}</span>
    </div>
  );
};
