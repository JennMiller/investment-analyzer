import React, { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

const LOCAL_STORAGE_KEY = 'invInfo-v2';

const getNum = (num, defaultNum = 0) => {
  return Number(num) || defaultNum;
};

const emptyState = { numOfShares: 1, buy: 0, sell: 0 };

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useLocalStorage(LOCAL_STORAGE_KEY, [
    { ...emptyState }
  ]);

  const getStoredData = (index) => {
    const { numOfShares, buy, sell } = storage?.[index] ?? {};
    return {
      initialBuy: getNum(buy),
      initialSell: getNum(sell),
      initialNumOfShares: getNum(numOfShares, 1)
    };
  };

  const updateStoredData = ({ index, numOfShares, buy, sell }) => {
    const updatedStorage = [...storage];

    updatedStorage[index] = {
      numOfShares,
      buy,
      sell
    };

    setStorage(updatedStorage);
  };

  return (
    <StorageContext.Provider
      value={{ storage, getStoredData, updateStoredData }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => useContext(StorageContext);
