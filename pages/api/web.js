import nc from "next-connect";
import validUrl from "valid-url";
import axios from "axios";
import { saveImage } from "../../utils/saveImage";

export default nc().get(async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(200).end();
  }
  try {
    if (validUrl.isUri(url)) {
      const response = await axios.get(url);
      if (response.headers["content-type"].includes("text/html")) {
        const result = response.data
          .match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/g)
          .map((v) => v.match(/src="([^"]*)"/)[1]);
        await Promise.allSettled(result.map(saveImage));
      }
      return res.status(201).send("ok");
    }
    res.status(400).end("invalid url");
  } catch (error) {
    res.status(500).end("error");
  }
});
