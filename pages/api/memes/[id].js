import nc from "next-connect";
import axios from "axios";
import { prisma } from "../../../db";

export default nc().get(async (req, res) => {
  const id = +req.query.id;
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const result = await prisma.memes.findUnique({ where: { id } });
  if (!result) {
    return res.status(404).end();
  }
  return res.redirect(result.url);
});
