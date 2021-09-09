import { themeGet } from '@styled-system/theme-get';
import { Flex, getPaletteColor, Input, Label } from 'pcln-design-system';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteStockButton from './DeleteStockButton';

const ColumnFlex = styled(Flex)`
  flex-direction: column;
`;

const Container = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: ${themeGet('space.4')}px;
`;

const StyledLabel = styled(Label)`
  margin: 10px 0 5px;
  font-size: ${themeGet('fontSizes.2')}px;
`;

const StyledInput = styled(Input)`
  font-size: ${themeGet('fontSizes.2')}px;
  padding: ${themeGet('space.2')}px;
`;

const InputsContainer = styled(ColumnFlex)`
  margin-right: 15px;
  width: 100%;
`;

const StyledInterest = styled(Flex)`
  margin-left: 4px;
  align-items: center;
  color: ${({ interest }) =>
    interest === 0
      ? getPaletteColor('text.base')
      : interest > 0
      ? getPaletteColor('secondary.base')
      : 'red'};
`;

const ComputedDataContainer = styled(Flex)`
  flex-direction: column;
  font-size: ${themeGet('fontSizes.2')}px;
`;

const InterestContainer = styled(Flex)`
  flex-direction: column;
  margin-top: ${themeGet('space.2')}px;
`;

const InterestInput = styled(StyledInput)`
  width: 100px;
  margin-right: 5px;
`;

const StockName = styled(Flex)`
  input {
    border-color: ${getPaletteColor('border.lightest')};
    font-weight: bold;
  }
`;

const formatPrice = (price) => Number(price.toFixed(5));

function InterestCalculator({
  index,
  getStoredData,
  updateStoredData,
  onDeleteButtonClick
}) {
  const { initialName, initialBuy, initialSell, initialNumOfShares } =
    getStoredData(index);

  const [buy, setBuy] = useState(initialBuy);
  const [sell, setSell] = useState(initialSell);
  const [percentageInterest, setPercentageInterest] = useState(0);
  const [dollarInterest, setDollarInterest] = useState(0);

  const [totalBuy, setTotalBuy] = useState(0);
  const [totalSell, setTotalSell] = useState(0);
  const [numOfShares, setNumOfShares] = useState(initialNumOfShares);
  const [name = '', setName] = useState(initialName);

  useEffect(() => {
    updateStoredData({ index, name, numOfShares, buy, sell });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buy, sell, numOfShares, name]);

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
    setSell(buy * percentageInterest);
  };

  return (
    <Container>
      <InputsContainer>
        <StockName>
          <StyledInput
            id="stock-name"
            name="stock-name"
            type="text"
            value={name}
            placeholder="Enter Name/Ticker"
            onChange={(event) => updateState(setName, event)}
          />
        </StockName>

        <StyledLabel htmlFor="shares">Shares</StyledLabel>
        <StyledInput
          id="shares"
          name="shares"
          type="number"
          value={numOfShares}
          onChange={(event) => updateState(setNumOfShares, event)}
        />

        <StyledLabel htmlFor="buy">Buy at</StyledLabel>
        <StyledInput
          id="buy"
          name="buy"
          type="number"
          value={buy || ''}
          onChange={(event) => updateState(setBuy, event)}
        />

        <StyledLabel>Sell at</StyledLabel>
        <StyledInput
          id="sell"
          name="sell"
          type="number"
          value={sell || ''}
          onChange={(event) => updateState(setSell, event)}
        />
      </InputsContainer>
      <ComputedDataContainer>
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
      {index > 0 && <DeleteStockButton onClick={onDeleteButtonClick} />}
    </Container>
  );
}

export default InterestCalculator;
