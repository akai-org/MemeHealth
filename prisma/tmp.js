require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();

(async () => {
  try {
    for (let i = 24; i < 100; i++) {
      console.log("i", i);
      await axios.get(
        `http://localhost:3000/api/web?url=https://jbzd.com.pl/str/${i}`
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log(">>>END");
    await prisma.$disconnect();
  }
})();
