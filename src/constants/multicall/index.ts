import { ChainId } from '@kalycoinproject/sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: '0xE3f1A8Af16d2Dcd0B6F1F813C449375f85C9d97F',
  [ChainId.KALYCHAIN]: '0xD7a3C1253E8ddE3d61B0B6d469b241df307D399D',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
