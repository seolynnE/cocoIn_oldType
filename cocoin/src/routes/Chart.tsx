import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface ICoinId {
  coinId: string;
}
function Chart() {
  const coinId = useOutletContext();
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(`${coinId}`)
  );
  return <h2>Chart</h2>;
}
export default Chart;
