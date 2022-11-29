import { NextApiRequest, NextApiResponse } from "next";
import { InteractionType, InteractionResponseType, verifyKey } from "discord-interactions";

import { DiscordResponse } from "../../types/common";
import { parseRawBody } from "../../utils/helpers";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (request: NextApiRequest, response: NextApiResponse) {
  try {
    const signature = (request.headers["x-signature-ed25519"] || "").toString();
    const timestamp = (request.headers["x-signature-timestamp"] || "").toString();
    const rawBody = await parseRawBody(request);

    if (!verifyKey(rawBody, signature, timestamp, process.env.PUBLIC_KEY!)) {
      return response.status(401).json({ message: "Bad request signarure" });
    }

    const { type, data = {} } = JSON.parse(rawBody) as DiscordResponse;

    if (type === InteractionType.PING) {
      return response.status(200).send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      switch (name) {
        case "mood":
          return response.status(200).send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: "Hello dawg at:: " + new Date().toISOString(),
            },
          });

        default:
          return response.status(200).json({ message: "No command 🫤" });
      }
    }

    response.status(200).json({ message: "What u trin'do " });
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
}
