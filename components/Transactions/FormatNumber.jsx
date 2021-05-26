const formatAmount = amount => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  if (!amount) return null;

  return formatter.format(amount);
};
export default formatAmount;
