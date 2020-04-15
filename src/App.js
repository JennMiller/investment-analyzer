import React from "react";
import PercentageInterest from "./components/PercentageInterest";
import styled from "styled-components";
import { Heading, ThemeProvider } from "pcln-design-system";

const Container = styled(ThemeProvider)`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <Heading.h1>Simple Interest Calculator</Heading.h1>
      <PercentageInterest />
    </Container>
  );
}

export default App;
