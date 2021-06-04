import cheerio from "cheerio";
import fetch from "node-fetch";

async function getSite(url) {
  const site = await fetch(url);
  const body = await site.text();
  const $ = cheerio.load(body);
  return $;
}

export async function getNews() {
  const $ = await getSite("https://waitbutwhy.com/");
  const news = $(".one-half article")
    .map((i, el) => {
      const newsEl = $(el).find(".thumb a");
      const link = newsEl[0].attribs.href;
      const img = newsEl[0].children[0].attribs.src;
      const title = $(el).find("header.entry-header h3 a")[0].children[0].data;
      const description = $(el).find(".entry-excerpt").text();
      return { img, link, title, description };
    })
    .get();


  return news;
}
