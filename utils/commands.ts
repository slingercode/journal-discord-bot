import { CommandType, DiscordResponseCommand } from "../types/common";
import { discordRequest } from "./helpers";

const appId = process.env.APP_ID!;
const serverId = process.env.SERVER_ID!;

export async function getCommands() {
  const endpoint = `applications/${appId}/guilds/${serverId}/commands`;

  try {
    return await discordRequest<DiscordResponseCommand>(endpoint, {
      method: "GET",
    });
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export async function installCommand(command: CommandType) {
  const endpoint = `applications/${appId}/guilds/${serverId}/commands`;

  try {
    await discordRequest<DiscordResponseCommand>(endpoint, {
      method: "POST",
      body: JSON.stringify(command),
    });
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export async function uninstallCommands(commands: string[]) {
  const errors: string[] = [];

  commands.forEach(async (commandId) => {
    const response = await unisntallCommand(commandId);

    if (typeof response === "string") {
      errors.push(response);
    }
  });

  return errors;
}

async function unisntallCommand(commandId: string) {
  const endpoint = `applications/${appId}/guilds/${serverId}/commands/${commandId}`;

  try {
    await discordRequest<DiscordResponseCommand>(endpoint, {
      method: "DELETE",
    });

    return true;
  } catch (error) {
    return commandId;
  }
}
