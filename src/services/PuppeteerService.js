// import puppeteer from 'puppeteer';
import ChartsService from './charts';

const padding = 15;
const url = "https://www.hodldao.xyz";

const AUTO_TAB = true;

async function createHtmlDoc() {
    const browser = null; // await puppeteer.launch({ headless: false })
    const page = (await browser.pages())[0];

    console.log(' browser page ', page);

    await page.setViewport({
        width: 600,
        height: 300,
        deviceScaleFactor: 1,
    });

    var screenshotNum = 1;

    // inject the chart into the DOM and take a screenshot of it
    await page.exposeFunction('getElementAsPNG', async selector => {
        const chartElem = await page.$(selector);
        console.log(`Taking screenshot of ${selector}`);
        const boundingBox = await chartElem.boundingBox();
        console.dir(` bounding box: ${boundingBox}`);

        let scrSht = await chartElem.screenshot({
            path: `./screenshot_${screenshotNum++}.png`,
            clip: {
                x: boundingBox.x - padding,
                y: boundingBox.y - padding,
                width: boundingBox.width + padding * 2,
                height: boundingBox.height + padding * 2,
            }
        });

        console.log(' The ScreenShot as stream: ', scrSht);

        return scrSht;
    });

    await page.evaluateOnNewDocument(() => {

        // window.onloadp = async (e) => {
        //     console.log(' document.body ----- ', document.body);
        //     const chart = await ChartsService.EltMarketCandles(document.body);
        //     console.log(' chart ----- ', chart);
        // };

        // window.getElementAsPNG(chart.id)

        window.addEventListener('keyup', evt => {
            console.log(' !!!!!!!!!! keyup evt !!!!!!!! ', evt);

            if (evt.key === 'Tab') {
                // console.log(' evt ', evt);
            }
        });
    });

    console.log(' createHtmlDoc page ', url);

    await page.goto(url);

    // if (AUTO_TAB) {
    await page.waitForTimeout(1000);
    await page.$eval('#retrowaveScene', e => {
        console.log(' @@@@@@@@@@@@@@ ', e)
        e.click()
        page.keyboard.press('Tab');
    });
    // }
};

export default {
    createHtmlDoc
}