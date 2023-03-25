export const currencyFormat = (currency: string | number): string => {
    return currency.toString().replace(/^R\$\s*|\s/g, "").replace(",", ".");
}