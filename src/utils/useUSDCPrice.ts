// TODO: Actually calculate price
import { ChainId, Currency, JSBI, Price, WKLC, currencyEquals } from '@kalycoinproject/sdk';
import { useMemo } from 'react';
import { USDCe } from 'src/constants';
import { PairState, usePairs } from '../data/Reserves';
import { useChainId } from '../hooks';
import { wrappedCurrency } from './wrappedCurrency';

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price | undefined {
  const chainId = useChainId();
  const wrapped = wrappedCurrency(currency, chainId);
  const USDC = USDCe[chainId];
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WKLC[chainId], wrapped) ? undefined : currency,
        chainId ? WKLC[chainId] : undefined,
      ],
      [wrapped?.equals(USDC) ? undefined : wrapped, chainId === ChainId.KALYCHAIN ? USDC : undefined],
      [chainId ? WKLC[chainId] : undefined, chainId === ChainId.KALYCHAIN ? USDC : undefined],
    ],
    [chainId, currency, wrapped, USDC],
  );
  const [[klcPairState, klcPair], [usdcPairState, usdcPair], [usdcKlcPairState, usdcKlcPair]] =
    usePairs(tokenPairs);

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined;
    }
    // handle wklc/klc
    if (wrapped.equals(WKLC[chainId])) {
      if (usdcPair) {
        const price = usdcPair.priceOf(WKLC[chainId]);
        return new Price(currency, USDC, price.denominator, price.numerator);
      } else {
        return undefined;
      }
    }
    // handle usdc
    if (wrapped.equals(USDC)) {
      return new Price(USDC, USDC, '1', '1');
    }

    const klcPairKLCAmount = klcPair?.reserveOf(WKLC[chainId]);
    const klcPairKLCUSDCValue: JSBI =
      klcPairKLCAmount && usdcKlcPair
        ? usdcKlcPair.priceOf(WKLC[chainId]).quote(klcPairKLCAmount, chainId).raw
        : JSBI.BigInt(0);

    // all other tokens
    // first try the usdc pair
    if (usdcPairState === PairState.EXISTS && usdcPair && usdcPair.reserveOf(USDC).greaterThan(klcPairKLCUSDCValue)) {
      const price = usdcPair.priceOf(wrapped);
      return new Price(currency, USDC, price.denominator, price.numerator);
    }
    if (klcPairState === PairState.EXISTS && klcPair && usdcKlcPairState === PairState.EXISTS && usdcKlcPair) {
      if (usdcKlcPair.reserveOf(USDC).greaterThan('0') && klcPair.reserveOf(WKLC[chainId]).greaterThan('0')) {
        const klcUsdcPrice = usdcKlcPair.priceOf(USDC);
        const currencyKlcPrice = klcPair.priceOf(WKLC[chainId]);
        const usdcPrice = klcUsdcPrice.multiply(currencyKlcPrice).invert();
        return new Price(currency, USDC, usdcPrice.denominator, usdcPrice.numerator);
      }
    }
    return undefined;
  }, [
    chainId,
    currency,
    klcPair,
    klcPairState,
    usdcKlcPair,
    usdcKlcPairState,
    usdcPair,
    usdcPairState,
    wrapped,
    USDC,
  ]);
}
