/* eslint-disable max-lines */
import { CHAINS, ChainId, JSBI, Percent, Token, WKLC } from '@kalycoinproject/sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { gnosisSafe, injected, walletconnect, walletlink, xDefi } from '../connectors';

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: CHAINS[ChainId.TESTNET].contracts!.router,
  [ChainId.KALYCHAIN]: CHAINS[ChainId.KALYCHAIN].contracts!.router,
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.KALYCHAIN]: {},
};

export const NetworkContextName = 'NETWORK';

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 10 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = '600';

export const KSWAP: { [chainId in ChainId]: Token } = {
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    CHAINS[ChainId.TESTNET].contracts!.kswap,
    18,
    CHAINS[ChainId.TESTNET].kswap_symbol!,
    'Kalyswap',
  ),
  [ChainId.KALYCHAIN]: new Token(
    ChainId.KALYCHAIN,
    CHAINS[ChainId.KALYCHAIN].contracts!.kswap,
    18,
    CHAINS[ChainId.KALYCHAIN].kswap_symbol!,
    'Kalyswap',
  ),
};

export const USDT: { [chainId in ChainId]: Token } = {
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, ZERO_ADDRESS, 6, 'USDT', 'Tether USD'),
  [ChainId.KALYCHAIN]: new Token(
    ChainId.KALYCHAIN,
    '0xe6828eF9923943899199dc4464B791499025d5aC',
    6,
    'USDT',
    'Tether USD',
  ),
};

export const TRUSTED_TOKEN_ADDRESSES: { readonly [chainId in ChainId]: string[] } = {
  [ChainId.TESTNET]: [],
  [ChainId.KALYCHAIN]: [WKLC[ChainId.KALYCHAIN].address, KSWAP[ChainId.KALYCHAIN].address],
};

export const SWAP_DEFAULT_CURRENCY = {
  [ChainId.KALYCHAIN]: {
    inputCurrency: 'KLC',
    outputCurrency: USDT[ChainId.KALYCHAIN].address,
  },
  [ChainId.TESTNET]: {
    inputCurrency: '',
    outputCurrency: '',
  },
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.TESTNET]: [WKLC[ChainId.TESTNET], KSWAP[ChainId.TESTNET]],
  [ChainId.KALYCHAIN]: [WKLC[ChainId.KALYCHAIN], KSWAP[ChainId.KALYCHAIN], USDT[ChainId.KALYCHAIN]],
};

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);

// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)); // .01 KLC

export const KALYSWAP_TOKENS_REPO_RAW_BASE_URL = `https://raw.githubusercontent.com/kalycoinproject/tokens`;

export type LogoSize = 24 | 48;

export const ANALYTICS_PAGE = 'https://info.kalyswap.io';

export const TIMEFRAME = [
  {
    description: 'DAY',
    label: '1D',
    interval: 3600,
    momentIdentifier: 'day',
    days: '1',
  },
  {
    description: 'WEEK',
    label: '1W',
    interval: 86400,
    momentIdentifier: 'week',
    days: '7',
  },
  {
    description: 'MONTH',
    label: '1M',
    interval: 604800,
    momentIdentifier: 'month',
    days: '30',
  },
  {
    description: 'YEAR',
    label: '1Y',
    interval: 2629746,
    momentIdentifier: 'year',
    days: '365',
  },
  {
    description: 'ALL',
    label: 'ALL',
    interval: 2629746,
    momentIdentifier: '',
    days: 'max',
  },
];

export const SUBGRAPH_BASE_URL = `https://api.kalygraph.com/subgraphs/name/kalyswap`;

export const LANDING_PAGE = 'https://kalyswap.io';

export const EVM_SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  GNOSISSAFE: {
    connector: gnosisSafe,
    name: 'Gnosis Safe',
    iconName: 'gnosis_safe.png',
    description: 'Gnosis Safe Multisig Wallet.',
    href: null,
    color: '#010101',
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'Wallet Connect',
    iconName: 'walletConnectIcon.svg',
    description: 'Use Wallet Connect',
    href: null,
    color: '#315CF5',
  },
  XDEFI: {
    connector: xDefi,
    name: 'XDEFI Wallet',
    iconName: 'xDefi.png',
    description: window.xfi && window.xfi.ethereum ? 'Easy-to-use browser extension.' : 'Please Install',
    href: null,
    color: '#315CF5',
  },
  RABBY: {
    connector: injected,
    name: 'Rabby Wallet',
    iconName: 'rabby.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#7a7cff',
  },
};

export const KALYCHAIN_CHAIN_PARAMS = {
  chainId: '0x0f30', // A 0x-prefixed hexadecimal chainId
  chainName: 'KALYCHAIN Mainnet',
  nativeCurrency: {
    name: 'KALYCHAIN',
    symbol: 'KLC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.kalychain.io/rpc'],
  blockExplorerUrls: ['https://kalyscan.io/'],
};
export const IS_IN_IFRAME = window.parent !== window;

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}
export const DIRECTUS_URL_NEWS = `https://p7gm7mqi.directus.app/items/news?`;

export const COINGEKO_BASE_URL = `https://api.coingecko.com/api/v3/`;

export const OPEN_API_DEBANK = 'https://openapi.debank.com/v1/user';

/* eslint-enable max-lines */
