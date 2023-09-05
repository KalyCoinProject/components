import { KALYSWAP_TOKENS_REPO_RAW_BASE_URL, LogoSize } from 'src/constants';

export const getTokenLogoURL = (address: string, size: LogoSize = 24) =>
  `${KALYSWAP_TOKENS_REPO_RAW_BASE_URL}/main/assets/3888/${address}/logo_${size}.png`;
