import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Select, Label, Input, Flex } from "pcln-design-system";

const ColumnFlex = styled(Flex)`
  flex-direction: column;
`;

const Container = styled(Flex)`
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 100%;

  label {
    margin: 10px 0 5px;
    font-size: ${themeGet("fontSizes.2")}px;
  }
`;

const InputsContainer = styled(ColumnFlex)`
  margin-right: 15px;
`;

const StyledInterest = styled.div`
  color: ${({ interest }) =>
    interest === 0 ? "black" : interest > 0 ? "green" : "red"};
`;

const ComputedDataContainer = styled(Flex)`
  flex-direction: column;
  font-size: ${themeGet("fontSizes.3")}px;
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
      <InputsContainer>
        <Label htmlFor="currency">Currency</Label>
        <Select name="currency">
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
        </Select>

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
      </InputsContainer>
      <ComputedDataContainer>
        <Flex>
          Interest:
          <StyledInterest interest={interest}>{interest}%</StyledInterest>
        </Flex>
      </ComputedDataContainer>
    </Container>
  );
}

export default PercentageInterest;
