import nc from "next-connect";
import { prisma } from "../../../db";

export default nc().post(async (req, res) => {
  const { userId } = req.query;
  await prisma.notifications.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
  res.status(201).send("ok");
});
