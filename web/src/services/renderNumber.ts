export const renderNumber = (number: number) => {
  return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const renderPercentage = (number: number) => {
  return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
};

export const renderPrice = (price: number) => {
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const renderUnitedPrice = (price: number | string) => {
  const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
  if (priceNumber > 1000000) {
    return priceNumber / 1000000 + 'M';
  } else if (priceNumber > 1000) {
    return priceNumber / 1000 + 'K';
  }
  return priceNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
