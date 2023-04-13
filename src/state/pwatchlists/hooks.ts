import { ChainId, Token } from '@kalycoinproject/sdk';
import { useSelector } from 'react-redux';
import { KSWAP } from 'src/constants/tokens';
import { useKalyswapWeb3 } from 'src/hooks';
import { useAllTokens } from 'src/hooks/Tokens';
import { AppState } from '../index';

export function useSelectedCurrencyLists(): Token[] | undefined {
  const { chainId = ChainId.KALYCHAIN } = useKalyswapWeb3();
  const allTokens = useAllTokens();
  const coins = Object.values(allTokens || {});

  let addresses = useSelector<AppState, AppState['pwatchlists']['currencies']>((state) =>
    ([] as string[]).concat(state?.pwatchlists?.currencies || []),
  );

  addresses = [KSWAP[chainId]?.address, ...addresses];

  let allSelectedToken = [] as Token[];

  addresses.forEach((address) => {
    const filterTokens = coins.filter((coin) => address.toLowerCase() === coin.address.toLowerCase());

    allSelectedToken = [...allSelectedToken, ...filterTokens];
  });

  return allSelectedToken;
}

export function useIsSelectedCurrency(address: string): boolean {
  const { chainId = ChainId.KALYCHAIN } = useKalyswapWeb3();

  let addresses = useSelector<AppState, AppState['pwatchlists']['currencies']>((state) =>
    ([] as string[]).concat(state?.pwatchlists?.currencies || []),
  );

  addresses = [KSWAP[chainId]?.address, ...addresses];

  return (addresses || []).includes(address);
}
