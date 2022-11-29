import { NextApiRequest, NextApiResponse } from "next";
import { CommandType } from "../../types/common";
import { getCommands, installCommand, uninstallCommands } from "../../utils/commands";

export default async function (request: NextApiRequest, response: NextApiResponse) {
  if (process.env.NODE_ENV === "development") {
    try {
      switch (request.method) {
        case "GET":
          const commands = await getCommands();
          return response.status(200).json({ commands });

        case "POST":
          const command = request.body as CommandType;
          await installCommand(command);

          return response.status(200).json({ command });

        case "DELETE":
          const { ids = "" } = request.query;
          const errors = await uninstallCommands((ids as string).split(","));

          return response.status(200).json({ errors });

        default:
          return response.status(200).json({ message: "Unsupported method" });
      }
    } catch (error) {
      return response.status(500).json({ error: JSON.stringify(error) });
    }
  }

  return response.status(200).json({ message: "What u trin'do?" });
}
