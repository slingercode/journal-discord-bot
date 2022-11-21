import type { Readable } from "node:stream";

const headers: HeadersInit = {
  Authorization: `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json; charset=UTF-8",
  "User-Agent":
    "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
};

export async function discordRequest<T>(
  endpoint: string,
  options: RequestInit
): Promise<T> {
  const url = "https://discord.com/api/v10/" + endpoint;

  const res = await fetch(url, { headers, ...options });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(JSON.stringify(data));
  }

  return await res.json();
}

export async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}
