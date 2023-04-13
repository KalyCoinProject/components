import { KLC, ChainId, Currency, Token, WKLC } from '@kalycoinproject/sdk';
import { NativeCurrency as UniCurrency, Token as UniToken } from '@uniswap/sdk-core';

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === KLC[chainId] ? WKLC[chainId] : currency instanceof Token ? currency : undefined;
}

function convertToKalyswapToken(token: UniToken): Token {
  return new Token(token.chainId, token.address, token.decimals, token?.symbol, token?.name);
}

export function wrappedGelatoCurrency(
  currency: UniCurrency | UniToken,
  chainId: ChainId | undefined,
): Token | undefined {
  return chainId && !currency?.isToken
    ? WKLC[chainId]
    : currency.isToken
    ? convertToKalyswapToken(currency)
    : undefined;
}

export function unwrappedToken(token: Token, chainId: ChainId): Currency | Token {
  if (token?.equals?.(WKLC[token.chainId])) return KLC[chainId];
  return token;
}
