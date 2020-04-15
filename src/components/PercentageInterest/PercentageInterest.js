import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Select, Label, Input } from "pcln-design-system";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 30px;

  label {
    margin: 10px 0 5px;
    font-size: ${themeGet("fontSizes.2")}px;
  }
`;

const StyledInterest = styled.div`
  color: ${({ interest }) =>
    interest === 0 ? "black" : interest > 0 ? "green" : "red"};
`;

const StyledSelect = styled(Select)`
  /* width: 100px; */
`;

function PercentageInterest() {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [interest, setInterest] = useState(0);

  useEffect(() => {
    if (!buy || !sell) setInterest(0);
    else setInterest((((sell - buy) / buy) * 100).toFixed(2));
  }, [buy, sell]);

  const updateState = (setState, event) => {
    setState(event.target.value);
  };

  return (
    <Container>
      <Label htmlFor="currency">Currency</Label>
      <StyledSelect name="currency">
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
      </StyledSelect>

      <Label htmlFor="buy" autoHide>
        Buy at
      </Label>
      <Input
        id="buy"
        name="buy"
        type="number"
        value={buy || ""}
        onChange={(event) => updateState(setBuy, event)}
      />

      <Label autoHide>Sell at</Label>
      <Input
        id="sell"
        name="sell"
        type="number"
        value={sell || ""}
        onChange={(event) => updateState(setSell, event)}
      />

      <div>
        Interest:
        <StyledInterest interest={interest}>{interest}%</StyledInterest>
      </div>
    </Container>
  );
}

export default PercentageInterest;
