import * as fetch from "node-fetch";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import * as urlParser from "url";

const crawl = async (version: number) => {

  const data = await fetch('https://partner.venuzle.de/citywave-regensburg/sharedbookings/1/bookableevents/ajax/?start=2022-05-09T00:00:00&end=2022-05-16T00:00:00')
  .then((response) =>{return response.json()});

  const result = data.map(value => {
    return { start: value["start"], end: value["end"] }
  });

  const time = new Date (Date.now());

  try {
    
    fs.writeFile(`./dates/snippet_${ time.getDate() }-${ time.getMonth() }_v${ version }.txt`, JSON.stringify(result), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

/**/
let i = 0;
const repeater = setInterval(() => { 
  crawl(i++);
 }, 5000);



