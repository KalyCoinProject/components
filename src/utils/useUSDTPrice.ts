// TODO: Actually calculate price
import { ChainId, Currency, JSBI, Price, WKLC, currencyEquals } from '@kalycoinproject/sdk';
import { useMemo } from 'react';
import { USDT } from 'src/constants';
import { PairState, usePairs } from '../data/Reserves';
import { useChainId } from '../hooks';
import { wrappedCurrency } from './wrappedCurrency';

/**
 * Returns the price in USDT of the input currency
 * @param currency currency to compute the USDT price of
 */
export default function useUSDTPrice(currency?: Currency): Price | undefined {
  const chainId = useChainId();
  const wrapped = wrappedCurrency(currency, chainId);
  const USDT = USDT[chainId];
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WKLC[chainId], wrapped) ? undefined : currency,
        chainId ? WKLC[chainId] : undefined,
      ],
      [wrapped?.equals(USDT) ? undefined : wrapped, chainId === ChainId.KALYCHAIN ? USDT : undefined],
      [chainId ? WKLC[chainId] : undefined, chainId === ChainId.KALYCHAIN ? USDT : undefined],
    ],
    [chainId, currency, wrapped, USDT],
  );
  const [[klcPairState, klcPair], [usdtPairState, usdtPair], [usdtKlcPairState, usdtKlcPair]] = usePairs(tokenPairs);

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined;
    }
    // handle wklc/klc
    if (wrapped.equals(WKLC[chainId])) {
      if (usdtPair) {
        const price = usdtPair.priceOf(WKLC[chainId]);
        return new Price(currency, USDT, price.denominator, price.numerator);
      } else {
        return undefined;
      }
    }
    // handle usdt
    if (wrapped.equals(USDT)) {
      return new Price(USDT, USDT, '1', '1');
    }

    const klcPairKLCAmount = klcPair?.reserveOf(WKLC[chainId]);
    const klcPairKLCUSDTValue: JSBI =
      klcPairKLCAmount && usdtKlcPair
        ? usdtKlcPair.priceOf(WKLC[chainId]).quote(klcPairKLCAmount, chainId).raw
        : JSBI.BigInt(0);

    // all other tokens
    // first try the usdt pair
    if (usdtPairState === PairState.EXISTS && usdtPair && usdtPair.reserveOf(USDT).greaterThan(klcPairKLCUSDTValue)) {
      const price = usdtPair.priceOf(wrapped);
      return new Price(currency, USDT, price.denominator, price.numerator);
    }
    if (klcPairState === PairState.EXISTS && klcPair && usdtKlcPairState === PairState.EXISTS && usdtKlcPair) {
      if (usdtKlcPair.reserveOf(USDT).greaterThan('0') && klcPair.reserveOf(WKLC[chainId]).greaterThan('0')) {
        const klcUSDTPrice = usdtKlcPair.priceOf(USDT);
        const currencyKlcPrice = klcPair.priceOf(WKLC[chainId]);
        const usdtPrice = klcUSDTPrice.multiply(currencyKlcPrice).invert();
        return new Price(currency, USDT, usdtPrice.denominator, usdtPrice.numerator);
      }
    }
    return undefined;
  }, [chainId, currency, klcPair, klcPairState, usdtKlcPair, usdtKlcPairState, usdtPair, usdtPairState, wrapped, USDT]);
}
