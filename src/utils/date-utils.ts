export const convertMilisecondsToDate = (miliseconds: number): string => {
  const date = new Date(miliseconds);
  return date.toLocaleString();
};
