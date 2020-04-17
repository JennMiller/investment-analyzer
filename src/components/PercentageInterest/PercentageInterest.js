import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Select, Label, Input, Flex } from 'pcln-design-system';
import config from '../../config';
import axios from 'axios';

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
    font-size: ${themeGet('fontSizes.2')}px;
  }
`;

const InputsContainer = styled(ColumnFlex)`
  margin-right: 15px;
`;

const StyledInterest = styled(Flex)`
  margin-left: 4px;
  color: ${({ interest }) =>
    interest === 0 ? 'black' : interest > 0 ? 'green' : 'red'};
`;

const ComputedDataContainer = styled(Flex)`
  flex-direction: column;
  font-size: ${themeGet('fontSizes.3')}px;
`;

function PercentageInterest() {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [interest, setInterest] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [currencyRate, setCurrencyRate] = useState(1);
  const [totalBuy, setTotalBuy] = useState(0);
  const [totalSell, setTotalSell] = useState(0);
  const [numOfShares, setNumOfShares] = useState(1);

  useEffect(() => {
    axios.get(config.currencyExchangeAPI).then(({ data }) => {
      if (data) {
        setCurrencyRate(data.observations.pop().FXUSDCAD.v);
      }
    });
  }, []);

  useEffect(() => {
    if (!buy || !sell) {
      setInterest(0);
      setTotalBuy(0);
      setTotalSell(0);
    } else {
      const newInterestRate = (sell - buy) / buy;

      setInterest((newInterestRate * 100).toFixed(2));
      setTotalBuy(buy * numOfShares);
      setTotalSell((buy * newInterestRate + Number(buy)) * numOfShares);
    }
  }, [buy, sell, numOfShares]);

  const updateState = (setState, event) => {
    setState(event.target.value);
  };

  return (
    <Container>
      <InputsContainer>
        <Label htmlFor="currency">Currency</Label>
        <Select
          name="currency"
          value={currency}
          onChange={(event) => updateState(setCurrency, event)}
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
        </Select>

        <Label htmlFor="shares">Shares</Label>
        <Input
          id="shares"
          name="shares"
          type="text    "
          value={numOfShares}
          onChange={(event) => updateState(setNumOfShares, event)}
        />

        <Label htmlFor="buy">Buy at</Label>
        <Input
          id="buy"
          name="buy"
          type="number"
          value={buy}
          onChange={(event) => updateState(setBuy, event)}
        />

        <Label>Sell at</Label>
        <Input
          id="sell"
          name="sell"
          type="number"
          value={sell}
          onChange={(event) => updateState(setSell, event)}
        />
      </InputsContainer>
      <ComputedDataContainer>
        <Flex>USD to CAD: ${currencyRate}</Flex>
        <Flex>Buy Price: ${totalBuy}</Flex>
        <Flex>Sell Price: ${totalSell}</Flex>
        <Flex>
          Interest:
          <StyledInterest interest={interest}>{interest}%</StyledInterest>
        </Flex>
      </ComputedDataContainer>
    </Container>
  );
}

export default PercentageInterest;
