import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

const Container = styled.div`
  padding: 100px 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  padding: 17px 20px;
  border-bottom: 1px solid #fff;
  backdrop-filter: blur(2px);
  z-index: 10;
  h1 {
    font-size: 24px;
    font-weight: 900;
    z-index: 11;
  }
  p {
    padding-left: 8px;
    font-size: 18px;
    font-weight: 400;
  }
`;

const Loader = styled.span`
  display: block;
  margin: 0 auto;
  font-size: 30px;
  text-align: center;
`;

const CoinInfoWrap = styled.div`
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 340px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.2);
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      p {
        font-size: 12px;
        font-weight: 400;
        text-align: center;
      }
      span {
        padding-top: 12px;
        font-size: 18px;
      }
    }
    &.each-side {
      li {
        align-items: flex-start;
        &:last-child {
          align-items: flex-end;
        }
      }
    }
  }
  .description {
    max-width: 600px;
    margin: 0 auto;
    padding: 60px 0;
  }
`;

interface Params {
  coinId: string;
}

interface RouteState {
  state: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<keyof Params>();
  const { state } = useLocation() as RouteState;
  const [coinInfo, setCoinInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setCoinInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <h1>cocoIn</h1>
        <p>{state}</p>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinInfoWrap>
          <ul>
            <li>
              <p>RANK</p>
              <span>{coinInfo?.rank}</span>
            </li>
            <li>
              <p>SYMBOL</p>
              <span>{coinInfo?.symbol}</span>
            </li>
            <li>
              <p>
                OPEN
                <br />
                SOURCE
              </p>
              {coinInfo?.open_source ? <span>YES</span> : <span>No</span>}
            </li>
          </ul>
          <p className="description">{coinInfo?.description}</p>
          <ul className="each-side">
            <li>
              <p>TOTAL SUPLY</p>
              <span>{priceInfo?.total_supply}</span>
            </li>
            <li>
              <p>MAX SUPPLY</p>
              <span>{priceInfo?.max_supply}</span>
            </li>
          </ul>
          <Routes>
            <Route path="price" element={<Price />} />
            <Route path="/chart" element={<Chart />} />
          </Routes>
        </CoinInfoWrap>
      )}
    </Container>
  );
}

export default Coin;
