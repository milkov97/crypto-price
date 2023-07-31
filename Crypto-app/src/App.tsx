import { useMemo } from "react";
import Sidebar from "./components/Sidebar";
import { Coin, MarketChartApiResponse } from "./types";
import Chart from "./components/Chart";
import useHttp from "./hooks/useHttp";
import { transformApiData } from "./utils/chart-utils";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { formatAsCurrency } from "./utils/general-utils";

function App() {
  const [selectedCoin, setSelectedCoin] =
    useLocalStorage<Coin>("selected-coin");

  const { data: marketData, isLoading } =
    useHttp<MarketChartApiResponse>(`https://api.coingecko.com/api/v3/coins/${selectedCoin?.id}/market_chart?vs_currency=usd&days=1
`);

  const chartData = useMemo(() => {
    if (selectedCoin && marketData) {
      return transformApiData(marketData, selectedCoin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketData]);

  return (
    <div>
      <Sidebar selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />

      <div className="fixed right-0 w-3/4 p-8">
        {/* Heading */}
        <div className="w-fit">
          {/* Image and Name */}
          {selectedCoin && (
            <div className="flex gap-x-2 items-center">
              <img
                src={selectedCoin?.image}
                alt={selectedCoin.name}
                className="w-8 h-8"
              />
              <h1 className="text-3xl">{selectedCoin?.name}</h1>
            </div>
          )}
          {/* Current price */}
          {selectedCoin && (
            <div className="flex gap-x-2 text-xl ml-10 mb-10">
              <h5>Current price: </h5>
              <span className="font-bold">
                {formatAsCurrency(selectedCoin.current_price)}
              </span>
            </div>
          )}
        </div>
        <Chart data={chartData} />
      </div>
    </div>
  );
}

export default App;
