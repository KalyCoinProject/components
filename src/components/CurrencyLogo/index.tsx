import { ChainId, Currency, KLC, Token } from '@kalycoinproject/sdk';
import deepEqual from 'deep-equal';
import React, { useMemo } from 'react';
import { CflrLogo, KlcLogo, WgmLogo } from 'src/components/Icons';
import { LogoSize } from 'src/constants';
import { getTokenLogoURL } from 'src/utils/getTokenLogoURL';
import { StyledLogo } from './styles';

export default function CurrencyLogo({
  currency,
  size = 24,
  style,
  imageSize = size,
}: {
  currency?: Currency;
  size?: LogoSize;
  style?: React.CSSProperties;
  imageSize?: LogoSize;
}) {
  const srcs: string[] = useMemo(() => {
    if (currency === KLC[ChainId.KALYCHAIN])
      return [];
    if (currency instanceof Token || !!(currency as Token).address) {
      const primarySrc = getTokenLogoURL((currency as Token)?.address, imageSize);

      return [primarySrc];
    }

    return [];
  }, [currency]);

  if (deepEqual(currency, KLC[ChainId.KALYCHAIN])) {
    return <KlcLogo size={`${size}px`} />;
  }

  return <StyledLogo size={`${size}px`} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />;
}
