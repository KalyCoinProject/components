import { LogoSize, KALYSWAP_TOKENS_REPO_RAW_BASE_URL } from 'src/constants';

export const getTokenLogoURL = (address: string, size: LogoSize = 24) =>
  `${KALYSWAP_TOKENS_REPO_RAW_BASE_URL}/main/assets/${address}/logo_${size}.png`;
