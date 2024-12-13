import { FC } from "react";

export const CommandMessage: FC<{ message: string }> = ({ message }) => {
  const commands = {
    "/GLOBE": {
      discription: "VIEW LIVE AIRDROP GLOBE",
      params: false,
    },
    "/DASHBOARD": {
      discription: "VIEW DASHBOARD",
      params: false,
    },
    "/LEADERBOARD": {
      discription: "DISPLAY THE CURRENT LEADERBOARD",
      params: false,
    },
    "/MUTE": {
      discription: "START OR OPEN PRIVATE CHAT WITH A USER",
      params: "@USERNAME",
    },
    "/WHISPER": {
      discription: "START/OPEN PRIVATE CHAT WITH A USER",
      params: "@USERNAME",
    },
    "/COMMANDS": {
      discription: "DISPLAY ALL AVAILABLE COMMANDS",
      params: false,
    },
  }

  if (message.charAt(0) === '/') {
    return (
      <div className="flex flex-col gap-2 fixed bottom-24 left-4 p-2 bg-black rounded-sm border border-gray-700">
        {Object.entries(commands)
          .filter(([command]) => command.toLowerCase().startsWith(message.toLowerCase()))
          .map(([command, details]) => (
            <div key={command} className="text-sm">
              <span className="font-semibold">{command}</span> - <span className="text-gray-400">{details.discription}</span>
            </div>
          ))}
      </div>
    )
  }
  return null;
}
