import { ChainId } from '@kalycoinproject/sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: '0xE3f1A8Af16d2Dcd0B6F1F813C449375f85C9d97F',
  [ChainId.KALYCHAIN]: '0xE3f1A8Af16d2Dcd0B6F1F813C449375f85C9d97F',
  [ChainId.WAGMI]: '0x5138349f3027F1e2c2f10eDAD83d38096C0D8Abe',
  [ChainId.COSTON]: '',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
