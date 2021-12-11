import nc from "next-connect";
import { prisma } from "../../../db";

export default nc().get(async (req, res) => {
  const result = await prisma.memes.findMany({
    select: { id: true, url: true },
  });
  const id = Math.floor(Math.random() * result.length);
  const { url } = result[id];
  return res.redirect(url);
});
