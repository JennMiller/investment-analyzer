import React from 'react';
import { IconButton, Flex } from 'pcln-design-system';
import { Close } from 'pcln-icons';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  justify-content: flex-start;
  padding-bottom: 180px;
`;

const DeleteStockButton = ({ onClick }) => (
  <Wrapper>
    <IconButton
      onClick={onClick}
      title="Remove Stock"
      icon={<Close size={20} />}
    />
  </Wrapper>
);

export default DeleteStockButton;
