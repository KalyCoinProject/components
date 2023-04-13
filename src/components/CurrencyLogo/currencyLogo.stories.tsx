import { KLC, ChainId } from '@kalycoinproject/sdk';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import CurrencyLogo from '.';

export default {
  component: CurrencyLogo,
  title: 'Components/CurrencyLogo',
};

const TemplateBox: ComponentStory<typeof CurrencyLogo> = (args: any) => <CurrencyLogo {...args} />;

export const DoubleLogo = TemplateBox.bind({});
DoubleLogo.args = {
  size: 24,
  currency: KLC[ChainId.KALYCHAIN],
};
