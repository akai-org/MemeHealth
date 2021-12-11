import axios from "axios";
import { prisma } from "../db";

export const createNotifications = async () => {
  const result = await prisma.notifications.findMany({
    select: { userId: true },
  });
  return axios.post("https://app.onesignal.com/api/v1/notifications", {
    app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APPID,
    headings: { en: "Memes Health" },
    contents: { en: "-> Look at this meme <-" },
    include_player_ids: result.map(({ userId }) => userId),
    url: process.env.NEXT_PUBLIC_VERCEL_URL,
  });
};
