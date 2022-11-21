import { NextApiRequest, NextApiResponse } from "next";
import { InteractionType, InteractionResponseType } from "discord-interactions";
import { handleCommands } from "../../utils/commands";
import { auth } from "../../utils/auth";
import { DiscordResponse } from "../../types/common";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Install commands
  if (process.env.NODE_ENV === "development") {
    const { install = "" } = request.query;

    try {
      if (install === "true") {
        handleCommands(process.env.APP_ID!, process.env.SERVER_ID!);
        return response.status(200).json({ message: "Commands installed" });
      }
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  try {
    const rawBody = await auth(request, response);

    const { type, data = {} } = JSON.parse(rawBody) as DiscordResponse;

    if (type === InteractionType.PING) {
      return response.status(200).send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      if (name === "hello") {
        return response.status(200).send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Hello dawg at " + new Date().toISOString(),
          },
        });
      }

      if (name === "hello2") {
        return response.status(200).send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Hello dawg two at " + new Date().toISOString(),
          },
        });
      }

      if (name === "test") {
        return response.status(200).send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "TEST",
          },
        });
      }

      return response.status(200).json({ message: "No command 🫤" });
    }

    response.status(200).json({ message: "What u trin'do " });
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
}
