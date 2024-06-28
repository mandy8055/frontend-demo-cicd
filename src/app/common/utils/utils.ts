export const generateUUID = () => {
  return crypto.randomUUID();
};

export const amountToNum = (val: string | null | undefined) => {
  return val ? parseInt(val?.replace(/[^0-9.]/g, '')) : 0;
};

export const numberFormatter = (
  number: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions | undefined,
) => {
  return new Intl.NumberFormat(locales, options).format(number);
};

export const findPercentage = (val1: number, val2: number) => {
  const percentage = (val1 / val2) * 100;
  return parseFloat(percentage.toFixed(1));
};
