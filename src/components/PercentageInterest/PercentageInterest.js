import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 30px;
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  input {
    margin-left: 10px;
    height: 32px;
    font-size: 25px;
    width: 120px;
  }
`;
const StyledInterest = styled.div`
  color: ${({ interest }) =>
    interest === 0 ? "black" : interest > 0 ? "green" : "red"};
`;

function PercentageInterest() {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [interest, setInterest] = useState(0);

  useEffect(() => {
    if (!buy || !sell) setInterest(0);
    else setInterest(((1 - buy / sell) * 100).toFixed(2));
  }, [buy, sell]);

  return (
    <Container>
      <StyledLabel htmlFor="buy">
        Buy at:
        <input
          name="buy"
          type="number"
          value={buy || ''}
          onChange={(event) => setBuy(event.target.value)}
        />
      </StyledLabel>
      <StyledLabel htmlFor="sell">
        Sell at:
        <input
          type="number"
          value={sell  || ''}
          onChange={(event) => setSell(event.target.value)}
        />
      </StyledLabel>
      <div>
        Interest:
        <StyledInterest interest={interest}>{interest}%</StyledInterest>
      </div>
    </Container>
  );
}

export default PercentageInterest;
