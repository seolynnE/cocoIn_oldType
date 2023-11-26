import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

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

interface Params {
  coinId: string;
}

interface RouteState {
  state: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<keyof Params>();
  const { state } = useLocation() as RouteState;
  return (
    <Container>
      <Header>
        <h1>cocoIn</h1>
        <p>{state}</p>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
