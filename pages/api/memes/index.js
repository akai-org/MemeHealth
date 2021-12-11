import nc from "next-connect";
import axios from "axios";
import { prisma } from "../../../db";

export default nc().get(async (req, res) => {
  const result = await prisma.memes.findMany({
    select: { id: true, url: true },
  });
  const id = Math.floor(Math.random() * result.length);
  const { url } = result[id];
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  res.setHeader("Content-Type", response.headers["content-type"]);
  res.send(response.data);
});
