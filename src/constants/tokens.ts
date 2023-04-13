import { CHAINS, ChainId, Token } from '@kalycoinproject/sdk';

export const KSWAP: { [chainId in ChainId]: Token } = {
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    CHAINS[ChainId.TESTNET].contracts!.kswap,
    18,
    CHAINS[ChainId.TESTNET].kswap_symbol,
    'Kalyswap',
  ),
  [ChainId.KALYCHAIN]: new Token(
    ChainId.KALYCHAIN,
    CHAINS[ChainId.KALYCHAIN].contracts!.kswap,
    18,
    CHAINS[ChainId.KALYCHAIN].kswap_symbol,
    'Kalyswap',
  ),
  [ChainId.WAGMI]: new Token(
    ChainId.WAGMI,
    CHAINS[ChainId.WAGMI].contracts!.kswap,
    18,
    CHAINS[ChainId.WAGMI].kswap_symbol,
    'Wagmi Kalyswap',
  ),
  [ChainId.COSTON]: new Token(
    ChainId.COSTON,
    CHAINS[ChainId.COSTON].contracts!.kswap,
    18,
    CHAINS[ChainId.COSTON].kswap_symbol,
    'Wagmi Kalyswap',
  ),
};
