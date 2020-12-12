import { createChart, } from 'lightweight-charts';

function getChart(htmlDoc) {

    return createChart(htmlDoc, {
        width: 600,
        height: 300,
        layout: {
            backgroundColor: '#000000',
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
            vertLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
            horzLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
    });
};

function addCandleSeries(chart) {
    let defOpts = {
        upColor: 'rgba(255, 144, 0, 1)',
        downColor: '#000',
        borderDownColor: 'rgba(255, 144, 0, 1)',
        borderUpColor: 'rgba(255, 144, 0, 1)',
        wickDownColor: 'rgba(255, 144, 0, 1)',
        wickUpColor: 'rgba(255, 144, 0, 1)',
    };
    return chart.addCandlestickSeries({
        ...defOpts,
    });
};

function setSeriesData(chart, data) {
    let series = addCandleSeries(chart);
    console.log('?????', data);
    series.setData(data);
}

export default function () {

    return ({
        getRawChart: getChart,
        setSeriesData: setSeriesData,
        getEmbedableChart: (data) => {
            let chart = getChart();
            console.dir(chart, { depth: 0 });
            // setSeriesData(chart, data);

            // var turndownService = new TurndownService();
            // var markdownDoc = new turndownService.turndown(htmlDoc);
            // console.log(' ----- markdownDoc ----- ', markdownDoc);

            return chart;
        },
    })
}