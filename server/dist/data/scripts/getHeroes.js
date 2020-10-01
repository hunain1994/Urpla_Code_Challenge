"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const fs_1 = require("fs");
const path_1 = require("path");
function getHeroes() {
    return new Promise((ack, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const START_URL = "https://www.marvel.com/characters";
            let heroes = [];
            const browser = yield puppeteer.launch({
                headless: false
            });
            const page = yield browser.newPage();
            // await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
            console.log('Getting heroes from website', START_URL);
            //await page.goto(START_URL);
            yield page.goto(START_URL, { waitUntil: 'networkidle2', timeout: 0 });
            yield page.waitForSelector("body");
            let data = yield page.evaluate(() => {
                let heroAnchors = [];
                let elements = document.querySelector('div[class="grid-base grid__6 "]').querySelectorAll('.mvl-card');
                //let elements = document.querySelectorAll('div[class="grid-base grid__6 "] > div[class="mvl-card mvl-card--explore"] > a');
                let count = 1;
                elements.forEach((item) => {
                    //heroAnchors.push(item.querySelector('a'));
                    //"https://www.marvel.com"+item.querySelector('a').getAttribute('href').toString(),
                    //card-thumb-frame__thumbnail img__blur
                    heroAnchors.push({
                        id: count.toString(),
                        name: item.querySelector('a > div[class="card-body is-sliding"] > p').innerHTML.toString(),
                        photo: item.querySelector('a > div[class="card-thumb-frame"] > figure > img').getAttribute('src').toString(),
                        bio: ""
                    });
                    count++;
                });
                return heroAnchors;
            });
            heroes = data;
            fs_1.writeFile(path_1.resolve(__dirname, "../heroes.json"), JSON.stringify(heroes, null, 2), err => {
                if (err) {
                    throw err;
                }
                console.log("Finished writing file");
            });
            yield browser.close();
            return ack(heroes);
        }
        catch (e) {
            return reject(e);
        }
    }));
}
//   // let heroMainPageAnchor: string[] = [];  
// }
getHeroes().then(console.log).catch(console.error);
//# sourceMappingURL=getHeroes.js.map