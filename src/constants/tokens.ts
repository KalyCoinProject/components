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
};
