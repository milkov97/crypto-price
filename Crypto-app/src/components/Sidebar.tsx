import { useMemo, useState } from "react";
import { Coin } from "../types";
import useHttp from "../hooks/useHttp";

interface SidebarProps {
  selectedCoin?: Coin;
  setSelectedCoin: (coin: Coin) => void;
}

const Sidebar = ({ selectedCoin, setSelectedCoin }: SidebarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const {data: coins, isLoading} = useHttp<Array<Coin>>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")

  const filteredCoins = useMemo(
    () =>
      coins?.filter((coin) =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue, coins]
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-1/4 bg-zinc-800 text-zinc-50 py-8">
      {/* Search input */}
      <div className="px-4">
        <input
          placeholder="Search cryptocurrencies..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-zinc-900 p-2 rounded w-full text-zinc-50"
        />
      </div>

      {/* List of coins */}
      <div className="mt-4 px-4 pb-8 overflow-y-scroll h-full w-full">
        {filteredCoins?.map((coin) => (
          <button
            key={coin.id}
            onClick={() => setSelectedCoin(coin)}
            className={`p-2 my-2 w-full text-zinc-100 rounded flex items-center gap-x-2
                    bg-zinc-800 hover:bg-zinc-900 ${
                      selectedCoin?.id === coin.id
                        ? "bg-zinc-900"
                        : "bg-zinc-800"
                    }`}
          >
            <img src={coin.image} alt={coin.name} className="w-8 h-8" />
            <h3>{coin.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
