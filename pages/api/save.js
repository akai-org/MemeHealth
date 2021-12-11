import nc from "next-connect";
import { saveImage } from "../../utils/saveImage";

export default nc().get(async (req, res) => {
  try {
    const { url } = req.query;
    if (url) {
      await saveImage(url);
    }
    res.status(201).end("ok");
  } catch (error) {
    res.status(500).end("error");
  }
});
