import React from 'react';
import PercentageInterest from '../PercentageInterest';
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
      <Heading.h1>Simple Interest Calculator</Heading.h1>
      <PercentageInterest />
    </Container>
  );
}

export default Home;
