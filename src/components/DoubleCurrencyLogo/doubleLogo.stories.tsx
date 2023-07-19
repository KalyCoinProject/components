import { CHAINS, ChainId, Token } from '@kalycoinproject/sdk';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import { DoubleCurrencyLogo } from '.';

export default {
  component: DoubleCurrencyLogo,
  title: 'Components/DoubleCurrencyLogo',
};

const currency0 = new Token(
  ChainId.KALYCHAIN,
  '0x89aE5C335372bF4d06ece4cEE1e92D04c3fdf1e0',
  18,
  'ETH',
  'Ethereum Token',
);
const currency1 = new Token(
  ChainId.KALYCHAIN,
  CHAINS[ChainId.KALYCHAIN].contracts!.kswap,
  18,
  CHAINS[ChainId.KALYCHAIN].kswap_symbol!,
  'Kalyswap',
);

const TemplateBox: ComponentStory<typeof DoubleCurrencyLogo> = (args: any) => <DoubleCurrencyLogo {...args} />;

export const DoubleLogo = TemplateBox.bind({});
DoubleLogo.args = {
  size: 24,
  currency0: currency0,
  currency1: currency1,
  margin: false,
};
