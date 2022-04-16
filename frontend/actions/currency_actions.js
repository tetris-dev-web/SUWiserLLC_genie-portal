export const getETH2USD = () => {
  return fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH', {}).then((response) => {
    return response
      .json()
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  });
};