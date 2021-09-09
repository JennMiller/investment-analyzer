import React from 'react';
import { Flex, Button } from 'pcln-design-system';
import { Plus } from 'pcln-icons';

const AddStockButton = ({ onClick }) => (
  <Button onClick={onClick} variation="outline" width="fit-content" py={0}>
    <Flex alignItems="center">
      Add Stock
      <Plus size={40} />
    </Flex>
  </Button>
);

export default AddStockButton;
