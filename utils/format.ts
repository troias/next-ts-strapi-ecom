export const toLocalStingMoney = (money: number) => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(money)
}

// Formats int to currency
