const LOCAL_STORAGE_KEY = 'invInfo';

const getNum = (num, defaultNum = 0) => {
  return Number(num) || defaultNum;
};

export const updateStoredData = (numOfShares, buy, sell) => {
  const investmentInfo = {
    numOfShares,
    buy,
    sell
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(investmentInfo));
};

export const getStoredData = () => {
  const { numOfShares, buy, sell } = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
  );

  return {
    initialBuy: getNum(buy),
    initialSell: getNum(sell),
    initialNumOfShares: getNum(numOfShares, 1)
  };
};
