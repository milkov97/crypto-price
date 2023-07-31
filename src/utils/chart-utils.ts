import { Coin, MarketChartApiResponse } from "../types";
import { convertMilisecondsToDate } from "./date-utils";
import {ChartData} from "chart.js"
import { decimateArray } from "./general-utils";


export const transformApiData = (apiData: MarketChartApiResponse, selectedCoin: Coin): ChartData<"line"> => {
    const result: ChartData<"line"> = {
      labels: decimateArray(apiData.prices.map((price) => convertMilisecondsToDate(price[0]))),
      datasets: [
        {
          label: selectedCoin.name,
          data: decimateArray(apiData.prices.map((price) => price[1])),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    return result;
}