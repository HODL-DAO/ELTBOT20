import CandleSeries from './CandleSeries';

// const chartParentElem = document.createDocumentFragment();

export default {
    EltMarketCandles: (data) => {
        return new CandleSeries.getSVG(data, parent);
    }
}
