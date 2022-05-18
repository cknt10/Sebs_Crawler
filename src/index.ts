import * as fetch from "node-fetch";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import * as urlParser from "url";
import * as util from 'util';

const crawl = async (version: number) => {

  const days = 9;
  const today = new Date();
  const upcomingDays = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
  //'https://partner.venuzle.de/citywave-regensburg/sharedbookings/1/bookableevents/ajax/?start=2022-05-09T00:00:00&end=2022-05-16T00:00:00't
  try {

    const data = await fetch(`https://partner.venuzle.de/citywave-regensburg/sharedbookings/1/bookableevents/ajax/?start=${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}T00:00:00&end=${upcomingDays.getFullYear()}-${upcomingDays.getMonth()+1}-${upcomingDays.getDate()}T00:00:00`)
    .then((response: any) =>{return response.json()});

    const result = data.map((value: any) => {
      console.log("value",value);
      return {
        id: value.id,
        day: value.day,
        from: value.from,
        to: value.to,
        css: value.css,
        seats: value.seats,
        customerSeats: value.customerSeats,
        configured: value.configured,
        bookable: value.bookable,
        inPast: value.inPast,
        text: value.text,
        legendId: value.legendId,
        legendText: value.legendText,
        Timestamp: `${ today.getDate() }.${ (today.getMonth()+1)<=9?"0":"" }${ today.getMonth()+1 } ${ today.getHours() }:${ today.getMinutes() }Uhr`
        } //Need the following: id; day; from; to; css; seats; customerSeats; configured; bookable; inPast; text; legendId; legendText; CurrentTimeOfCrawler
    });

    fs.writeFile(`./dates/snippet.json`, JSON.stringify(result, null, 2), (err) => {
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



//const repeater = setInterval(() => { 
  crawl(i++);
 //}, 5000);



