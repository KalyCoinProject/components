import { KLC, ChainId, CurrencyAmount, JSBI } from '@kalycoinproject/sdk';
import { Currency, CurrencyAmount as UniCurrencyAmount } from '@uniswap/sdk-core';
import { MIN_KLC } from '../constants';

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(chainId: ChainId, currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined;
  if (chainId && currencyAmount.currency === KLC[chainId]) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_KLC)) {
      return CurrencyAmount.ether(JSBI.subtract(currencyAmount.raw, MIN_KLC), chainId);
    } else {
      return CurrencyAmount.ether(JSBI.BigInt(0), chainId);
    }
  }
  return currencyAmount;
}

export function galetoMaxAmountSpend(chainId: ChainId, currencyAmount?: UniCurrencyAmount<Currency>): any | undefined {
  if (!currencyAmount) return undefined;
  if (chainId && currencyAmount.currency === KLC[chainId]) {
    if (JSBI.greaterThan(currencyAmount.numerator, MIN_KLC)) {
      return CurrencyAmount.ether(JSBI.subtract(currencyAmount.numerator, MIN_KLC), chainId);
    } else {
      return CurrencyAmount.ether(JSBI.BigInt(0), chainId);
    }
  }
  return currencyAmount;
}
