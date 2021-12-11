import nc from "next-connect";
import { createNotifications } from "../../../utils/createNotifications";

export default nc().get(async (req, res) => {
  await createNotifications();
  res.end();
});
