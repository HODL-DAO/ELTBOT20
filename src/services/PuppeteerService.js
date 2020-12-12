import puppeteer from 'puppeteer';
import ChartsService from './charts';

const htmlString = '<!DOCTYPE html>';

const padding = 15;
// const url = process.env.URL;

async function createHtmlDoc() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.setViewport({
        width: 600,
        height: 300,
        deviceScaleFactor: 1
    });

    await page.evaluateOnNewDocument(() => {

        console.log(' !!!!!!!!!! 00000 !!!!!!!! ', window);

        ChartsService.EltMarketCandles(document.body);
    });
};

export default {
    createHtmlDoc
}