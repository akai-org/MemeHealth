import validUrl from "valid-url";
import axios from "axios";
import { prisma } from "../db";

export const saveImage = async (url) => {
  if (validUrl.isUri(url)) {
    const response = await axios.get(url);
    if (response.headers["content-type"].startsWith("image/")) {
      return prisma.memes.create({ data: { url } });
    }
  }
  throw Error("Invalid url");
};
