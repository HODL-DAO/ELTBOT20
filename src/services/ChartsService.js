import { createChart, cteateCharts } from 'lightweight-charts';
import puppeteer from 'puppeteer';

const ChartsService = () => {


    const getTokenChart = (wh = { width: 400, height: 300 }) => {
        const chart = createChart(document.body, wh);
    };


}; 