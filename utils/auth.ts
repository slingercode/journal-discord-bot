import { verifyKey } from "discord-interactions";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "./helpers";

export async function auth(request: NextApiRequest, response: NextApiResponse) {
  const signature = (request.headers["x-signature-ed25519"] || "").toString();
  const timestamp = (request.headers["x-signature-timestamp"] || "").toString();
  const buf = await buffer(request);
  const rawBody = buf.toString("utf8");

  if (!verifyKey(rawBody, signature, timestamp, process.env.PUBLIC_KEY!)) {
    throw new Error("Bad request signature");
  }

  return rawBody;
}
