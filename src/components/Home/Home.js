import React from 'react';
import InterestCalculator from '../InterestCalculator';
import { Heading, Flex } from 'pcln-design-system';
import styled from 'styled-components';

const Container = styled(Flex)`
  flex-direction: column;
  width: 100%;

  h1 {
    text-align: center;
  }
`;

function Home() {
  return (
    <Container>
      <Heading.h1>Investment Analyzer</Heading.h1>
      <InterestCalculator />
    </Container>
  );
}

export default Home;
