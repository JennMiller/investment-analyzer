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
    interest === 0 ? themeGet('text.base') : interest > 0 ? 'green' : 'red'};
`;

const ComputedDataContainer = styled(Flex)`
  flex-direction: column;
  font-size: ${themeGet('fontSizes.3')}px;
`;

const InterestContainer = styled(Flex)`
  flex-direction: column;
`;

const InterestInput = styled(Input)`
  padding: 2px;
  width: 100px;
  margin-right: 5px;
  text-align: center;
`;

const formatPrice = (price) => {
  return Number(price.toFixed(5));
};

function InterestCalculator() {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [percentageInterest, setPercentageInterest] = useState(0);
  const [dollarInterest, setDollarInterest] = useState(0);
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
      setPercentageInterest(0);
      setTotalBuy(0);
      setTotalSell(0);
    } else {
      const newInterestRate = (sell - buy) / buy;
      const totalBuy = buy * numOfShares;
      const totalSell = (buy * newInterestRate + Number(buy)) * numOfShares;

      setPercentageInterest(formatPrice(newInterestRate * 100));
      setDollarInterest(formatPrice(totalSell - totalBuy));
      setTotalBuy(formatPrice(totalBuy));
      setTotalSell(formatPrice(totalSell));
    }
  }, [buy, sell, numOfShares]);

  const updateState = (setState, event) => {
    setState(event.target.value);
  };

  const onPercentageInterestChange = (event) => {
    const newPercentageInterest = Number(event.target.value);

    setPercentageInterest(newPercentageInterest);
    setSell(formatPrice(buy * (1 + newPercentageInterest / 100)));
  };

  const onDollarInterestChange = (event) => {
    const newDollarInterest = Number(event.target.value);
    const percentageInterest = newDollarInterest / (buy * numOfShares) + 1;

    setDollarInterest(newDollarInterest);
    setSell(formatPrice(buy * percentageInterest));
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
          type="number"
          value={numOfShares}
          onChange={(event) => updateState(setNumOfShares, event)}
        />

        <Label htmlFor="buy">Buy at</Label>
        <Input
          id="buy"
          name="buy"
          type="number"
          value={buy || ''}
          onChange={(event) => updateState(setBuy, event)}
        />

        <Label>Sell at</Label>
        <Input
          id="sell"
          name="sell"
          type="number"
          value={sell || ''}
          onChange={(event) => updateState(setSell, event)}
        />
      </InputsContainer>
      <ComputedDataContainer>
        <Flex>USD to CAD: ${currencyRate}</Flex>
        <Flex>Buy Price: ${totalBuy}</Flex>
        <Flex>Sell Price: ${totalSell}</Flex>
        <InterestContainer>
          Interest:
          <StyledInterest interest={dollarInterest}>
            <InterestInput
              id="dollarInterest"
              name="dollarInterest"
              type="number"
              value={dollarInterest || ''}
              onChange={onDollarInterestChange}
            />
            $
          </StyledInterest>
          <StyledInterest interest={dollarInterest}>
            <InterestInput
              id="percentageInterest"
              name="percentageInterest"
              type="number"
              value={percentageInterest || ''}
              onChange={onPercentageInterestChange}
            />
            %
          </StyledInterest>
        </InterestContainer>
      </ComputedDataContainer>
    </Container>
  );
}

export default InterestCalculator;
