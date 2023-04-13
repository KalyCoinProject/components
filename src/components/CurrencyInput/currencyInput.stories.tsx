import { CHAINS, ChainId, Token } from '@kalycoinproject/sdk';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import { CurrencyInput } from '.';

export default {
  component: CurrencyInput,
  title: 'Components/CurrencyInputs',
};

const TemplateCurrencyInput: ComponentStory<typeof CurrencyInput> = (args: any) => <CurrencyInput {...args} />;

export const Default = TemplateCurrencyInput.bind({});
Default.args = {
  label: 'To',
  currency: new Token(
    ChainId.KALYCHAIN,
    CHAINS[ChainId.KALYCHAIN].contracts!.kswap,
    18,
    CHAINS[ChainId.KALYCHAIN].kswap_symbol!,
    'Kalyswap',
  ),
};
