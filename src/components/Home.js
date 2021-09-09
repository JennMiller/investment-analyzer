import React from 'react';
import InterestCalculator from './InterestCalculator';
import { Heading, Flex } from 'pcln-design-system';
import styled from 'styled-components';
import { useStorage } from '../libs/storage';
import AddStockButton from './AddStockButton';

const Container = styled(Flex)`
  flex-direction: column;
  width: 100%;

  h1 {
    text-align: center;
  }
`;

function Home() {
  const { storage, addStock, deleteStock, getStoredData, updateStoredData } =
    useStorage();

  return (
    <Container>
      <Heading.h1>Investment Analyzer</Heading.h1>
      {storage.map((_, index) => (
        <InterestCalculator
          key={index}
          index={index}
          getStoredData={getStoredData}
          updateStoredData={updateStoredData}
          onDeleteButtonClick={() => deleteStock(index)}
        />
      ))}
      <AddStockButton onClick={addStock} />
    </Container>
  );
}

export default Home;
