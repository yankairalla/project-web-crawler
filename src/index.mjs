import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import express from "express";
const app = express();

import { getNews } from "./js/crawl.mjs";

const PORT = process.env.PORT || "3000";

app.use(express.static(path.join(__dirname, 'public' )))

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const newsList = await getNews();
  console.log(__dirname + '/public');
  res.render("index", { newsList });
});

app.listen(3000, () => console.log(`Está rodando na porta ${PORT}`));
