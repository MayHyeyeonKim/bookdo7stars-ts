export const currencyFormat = (value: number | undefined): string => {
  const number = value !== undefined ? Number(value) : 0;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
