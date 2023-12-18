import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 100px 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  padding: 8px 20px;
  border-bottom: 1px solid #fff;
  backdrop-filter: blur(2px);
  z-index: 10;
  a {
    font-size: 24px;
    font-weight: 900;
    z-index: 11;
  }
`;

const CoinList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
`;

const Coin = styled.li`
  width: calc(100% / 3 - 8px);
  margin-bottom: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  a {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 20px;
    transition: color 0.1s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
  @media screen and (max-width: 440px) {
    width: 100%;
  }
`;

const Loader = styled.span`
  display: block;
  margin: 0 auto;
  font-size: 30px;
  text-align: center;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Link to="/">cocoIn</Link>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
