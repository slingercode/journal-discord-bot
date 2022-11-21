import { CommandType, DiscordResponseCommand } from "../types/common";
import { discordRequest } from "./helpers";

const HELLO_COMMAND: CommandType = {
  name: "hello",
  description: "Test command with a hello message",
};

const HELLO2_COMMAND: CommandType = {
  name: "hello2",
  description: "Test2 command with a hello message",
};

const TEST_COMMAND: CommandType = {
  name: "test",
  description: "Test command",
};

const commands = [HELLO_COMMAND, HELLO2_COMMAND, TEST_COMMAND];

export function handleCommands(appId: string, serverId: string) {
  commands.forEach(
    async (command) => await hasCommand(appId, serverId, command)
  );
}

export async function hasCommand(
  appId: string,
  serverId: string,
  command: CommandType
) {
  const endpoint = `applications/${appId}/guilds/${serverId}/commands`;

  try {
    const response = await discordRequest<DiscordResponseCommand[]>(endpoint, {
      method: "GET",
    });

    if (response) {
      const installedNames = response.map((c) => c.name);

      if (!installedNames.includes(command.name)) {
        installCommand(appId, serverId, command);
      } else {
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function installCommand(
  appId: string,
  serverId: string,
  command: CommandType
) {
  const endpoint = `applications/${appId}/guilds/${serverId}/commands`;

  try {
    await discordRequest<DiscordResponseCommand>(endpoint, {
      method: "POST",
      body: JSON.stringify(command),
    });
  } catch (error) {
    console.log(error);
  }
}
