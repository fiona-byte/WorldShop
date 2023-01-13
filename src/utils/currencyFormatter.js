const currencyFormat = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  currencyDisplay: 'symbol',
  trailingZeroDisplay: 'stripIfInteger',
});

export const currencyFormatter = (number) => {
  return number ? currencyFormat.format(number) : '';
};
