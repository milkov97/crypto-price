export function decimateArray<T>(arr: T[], n = 2): T[] {
  if (n <= 1) {
    throw new Error("Invalid decimation factor. It should be grater than 1");
  }

  return arr.filter((_, index) => (index + 1) % n !== 0);
}

export function formatAsCurrency(amount: number, currencyCode = "usd"): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  });
  return formatter.format(amount);
}
