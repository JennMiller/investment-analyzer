import React, { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

const LOCAL_STORAGE_KEY = 'invInfo-v2';

const getNum = (num, defaultNum = 0) => {
  return Number(num) || defaultNum;
};

const emptyState = { name: '', numOfShares: 1, buy: 0, sell: 0 };

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useLocalStorage(LOCAL_STORAGE_KEY, [
    { ...emptyState }
  ]);

  const getStoredData = (index) => {
    const { name, numOfShares, buy, sell } = storage?.[index] ?? {};
    return {
      initialName: name,
      initialBuy: getNum(buy),
      initialSell: getNum(sell),
      initialNumOfShares: getNum(numOfShares, 1)
    };
  };

  const addStock = () => {
    const updatedStorage = [...storage, { ...emptyState }];
    setStorage(updatedStorage);
  };

  const deleteStock = (index) => {
    const updatedStorage = [...storage];
    updatedStorage.splice(index, 1);

    setStorage(updatedStorage);
  };

  const updateStoredData = ({ index, name, numOfShares, buy, sell }) => {
    const updatedStorage = [...storage];

    updatedStorage[index] = {
      name,
      numOfShares,
      buy,
      sell
    };

    setStorage(updatedStorage);
  };

  return (
    <StorageContext.Provider
      value={{
        storage,
        getStoredData,
        updateStoredData,
        addStock,
        deleteStock
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => useContext(StorageContext);
