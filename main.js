/* 
Made Originally By: https://github.com/tegal1337
Updated & Upgraded By: https://github.com/KiritoTheDon
Patch Notes:
Features Added By KiritoTheDon (De'Mondre): 
- Browser closes when done with all keywords
- Seamlessly continuing commenting all keywords till array is done
- Live troubleshooting capability
_______________________________________________________________________
Notes
Add  Account switching feature to stop comments from failing to submit
Max Efficency Theoretically - Run the program once with 1 account then switch and run with whatever # of accounts is availble
*/
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const config = require("./config");
puppeteer.use(StealthPlugin());
var keyword = config.keywords;
var comments = config.comments;
const browserconfig = {
    //defaultViewport: null,
    // devtools: true,
  headless: false,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--mute-audio"],
// save into user data dir
  userDataDir: "fdciabdul",
};
async function startApp() {
  const browser = await puppeteer.launch(browserconfig);
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  
  await page.goto("https://accounts.google.com/");
  try {

  let checklogin = await page.$('#yDmH0d > c-wiz > div > div:nth-child(2) > div > c-wiz > c-wiz > div > div.s7iwrf.gMPiLc.Kdcijb > div > div > header > h1');

  let txtchecklogin = await page.evaluate(el => el.textContent, checklogin)

  console.log("you are logged in");
} catch {

  await page.waitForSelector("#identifierId");
  await page.type("#identifierId", config.usernamegoogle, { delay: 1000 });
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  await page.type("input", config.passwordgoogle, { delay: 1000 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(10000);
  console.log("=========== Waiting ==============")
// plz don't remove this line , atleast you're become to my subsciber who can know newest update from me xD 
// but if you still remove this one , you have to donate to me >:(
  await page.goto("https://www.youtube.com/channel/UC20YDKoLPR9OtsetXX0rnKQ");
 
  let element = await page.$('#subscribe-button');
  await page.waitForTimeout(10000);
  let value = await page.evaluate(el => el.textContent, element)
  console.log(value)
 try {
  await page.evaluate(() => {
    document.querySelector("#subscribe-button > ytd-subscribe-button-renderer > tp-yt-paper-button > yt-formatted-string").click();
  })
 } catch (error) {
   console.error(error)
 }
}
  console.log("=========== Start Commenting ==============") 

for(let i=0;i<keyword.length;i++){
  
  //await page.goto("https://www.youtube.com/results?search_query=" + keyword+"&sp=CAI%253D"); <-- if you want to get get videos by newest update , you can use this one
  await page.goto("https://www.youtube.com/results?search_query=" + keyword[i]); //+"&sp=EgQQARgD"
  await page.evaluate(() => {
    document.querySelector("#button").click();

  });
  await page.bringToFront();

  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await page.waitForTimeout(7000);

  const linked = await page.$$("#video-title");

  console.log(Object.keys(linked));
  var link = linked.filter(function (el) {
    return el != null;
  });

  console.log("Jumlah Link : ", link.length);
  let j =0;
  let k = 0;
  let c = 0;
  for (j in link) {
    c=0;
    const tweet = await await (await link[j].getProperty("href")).jsonValue();
    console.log(tweet);
    const pages = await browser.newPage();
    try {
      await pages.goto(tweet);
      await pages.bringToFront();
      await page.waitForTimeout(4000);
      await pages.evaluate(() => {
        window.scrollBy(0, 650);
      });
   
      try {
        await pages.waitForSelector("#message > span", { timeout: 4000 });
        console.log("Can't Comment");
        await pages.close();
      } catch {
        await pages.waitForSelector("#simplebox-placeholder", {
          timeout: 4000,
        });
    
        await pages.evaluate(() => {
          document.querySelector("#simplebox-placeholder").click();
    
        });
       
        c = [Math.floor(Math.random() * comments.length)];
        await pages.waitForTimeout(1000);
        await pages.keyboard.type(comments[c],{delay:15});
        await pages.waitForTimeout(200); //100
        await pages.keyboard.press("Enter");
        await pages.evaluate(() => {
          document.querySelector("#submit-button").click();
        });
        await page.waitForTimeout(2000); //4000
        await pages.close();
        console.log("Success Comment");
        console.log("Keyword: "+keyword[i]+" j= " + j + " Runs: " + k++ + " Comment #: " + c);
      }
      
    } catch(e) {
      await pages.close();
      console.log("Something Wrong maybe this is Short videos , live stream , or broken error : " + e);
    }
  }
  
}
  await browser.close();
  console.log("DONE! HAVE A NICE DAY");


}


startApp();
