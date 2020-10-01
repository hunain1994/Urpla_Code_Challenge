const puppeteer = require("puppeteer");
import { writeFile } from "fs";
import { resolve } from "path" ;
import { pathToFileURL } from "url";
import Hero from "../../models/hero";

function getHeroes() {
  return new Promise(async (ack, reject) => {
    try{
      const START_URL = "https://www.marvel.com/characters";
      let heroes: Hero[] = [];
      const browser = await puppeteer.launch({
        headless: false
      });
      const page = await browser.newPage();
      // await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
      console.log('Getting heroes from website',  START_URL);
      //await page.goto(START_URL);
      await page.goto(START_URL, { waitUntil: 'networkidle2', timeout: 0 });
      await page.waitForSelector("body");

      
      let data = await page.evaluate( () => {
        
        let heroAnchors = [];
        let elements = document.querySelector('div[class="grid-base grid__6 "]').querySelectorAll('.mvl-card');
        //let elements = document.querySelectorAll('div[class="grid-base grid__6 "] > div[class="mvl-card mvl-card--explore"] > a');
        let count: number = 1;
        elements.forEach((item) => {
          //heroAnchors.push(item.querySelector('a'));
          //"https://www.marvel.com"+item.querySelector('a').getAttribute('href').toString(),
          //card-thumb-frame__thumbnail img__blur
          heroAnchors.push(
            {
             id: count.toString(),
             name: item.querySelector('a > div[class="card-body is-sliding"] > p').innerHTML.toString(),
             photo: item.querySelector('a > div[class="card-thumb-frame"] > figure > img').getAttribute('src').toString(),
             bio:""
            }
          )
          count++;
        });

        return heroAnchors;          
      });
      
      heroes = data;

      writeFile(
        resolve(__dirname, "../heroes.json"),
        JSON.stringify(heroes, null, 2),
        err => {
          if (err) {
            throw err;
          }
          console.log("Finished writing file");
        }
      );

      await browser.close();  
      return ack(heroes);  
    }
    catch(e){
      return reject(e);
    }
  })
}

  
  


  
  
  
  
  
  

  
  
//   // let heroMainPageAnchor: string[] = [];  
  
  
  
  
  
// }

getHeroes().then(console.log).catch(console.error);
