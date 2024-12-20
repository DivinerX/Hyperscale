import { FC } from "react";

interface CommandMessageProps {
  message: string;
}

export const CommandMessage: FC<CommandMessageProps> = ({ message }) => {
  const commands = {
    "/GLOBE": {
      discription: "VIEW LIVE AIRDROP GLOBE",
      params: false,
    },
    "/PORTFOLIO": {
      discription: "VIEW PORTFOLIO",
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
    const matchedCommands = Object.entries(commands)
      .filter(([command]) => {
        const userInput = message.toLowerCase();
        const commandName = command.toLowerCase();
        
        if (userInput.includes(' ')) {
          return userInput.startsWith(commandName);
        }
        return commandName.startsWith(userInput);
      });

    return (
      <div className="flex flex-col gap-2 fixed bottom-24 left-4 p-2 bg-black rounded-sm border border-gray-700">
        {matchedCommands.length > 0 ? (
          matchedCommands.map(([command, details]) => (
            <div key={command} className="text-sm">
              <span className="font-semibold">{command}</span> - <span className="text-gray-400">{details.discription}</span>
              {details.params && <span className="text-gray-500 ml-1">{details.params}</span>}
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-400">no matching commands</div>
        )}
      </div>
    )
  }
  return null;
}
