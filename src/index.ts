import * as fetch from "node-fetch";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import * as urlParser from "url";

const seenUrls = {};



const getUrl = (link, host, protocol) => {
  if (link.includes("http")) {
    return link;
  } else if (link.startsWith("/")) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
};

const crawl = async ({ url, ignore }) => {
  /*
  if (seenUrls[url]) return;
  console.log("crawling", url);
  seenUrls[url] = true;

  const { host, protocol } = urlParser.parse(url);

  const response = await fetch(url);
  const html = await response.text();
  */

  const data = await fetch('https://partner.venuzle.de/citywave-regensburg/sharedbookings/1/bookableevents/ajax/?start=2022-05-09T00:00:00&end=2022-05-16T00:00:00')
  .then((response) =>{return response.json()});

  const result = data.map(value => {
    return { start: value["start"], end: value["end"] }
  });

  try {
    
    fs.writeFile('./dates/snippet.txt', JSON.stringify(result), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
  } catch (err) {
    console.log(err);
  }

  /*
  const $ = cheerio.load(html);

  const links = $("a")
    .map((i, link) => link.attribs.href)
    .get();
    //console.log("our links", links);

  const imageUrls = $("img")
    .map((i, link) => link.attribs.src)
    .get();

  imageUrls.forEach((imageUrl) => {
    fetch(getUrl(imageUrl, host, protocol)).then((response) => {
      const filename = path.basename(imageUrl);
      const dest = fs.createWriteStream(`images/${filename}`);
      response.body.pipe(dest);
    });
  });

  links
    .filter((link) => link.includes(host) && !link.includes(ignore))
    .forEach((link) => {
      crawl({
        url: getUrl(link, host, protocol),
        ignore,
      });
    });
    */
};

/**/
crawl({
  url: "https://citywave.de/regensburg/",
  ignore: "/search",
});


const time = new Date (Date.now());
//console.log(time.getDay(), time.getDate());
console.log(time.toLocaleString());