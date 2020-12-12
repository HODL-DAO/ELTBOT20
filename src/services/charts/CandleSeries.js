import { createChart } from 'lightweight-charts';

function getChart(p) {
    let parent = document.body;
    console.log('!!!!!! parent ', parent);

    return createChart(parent, {
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
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
    });
};

function addCandleSeries(chart, options) {
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
        ...options,
    });
};

function setSeriesData(data, options) {
    let series = addCandleSeries(chart,)

    console.log('?????', series.setData(data));
}

export default function () {

    return ({
        getRawChart: getChart,
        setSeriesData: setSeriesData,
        getEmbedableChart: (parent, data, options) => {
            let chart = getChart(parent);
            console.dir(chart, { depth: 0 });
            setSeriesData(data, options);

            return chart;
        },
    })
}