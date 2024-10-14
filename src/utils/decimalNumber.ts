export const decimalNumber = (number: string | number) => {
  const convertedNumber = Number(number);
  return convertedNumber.toLocaleString();
};
