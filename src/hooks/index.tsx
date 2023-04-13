import { Web3Provider as Web3ProviderEthers } from '@ethersproject/providers';
import { ChainId } from '@kalycoinproject/sdk';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

interface Web3State {
  library: Web3ProviderEthers | undefined;
  account: string | undefined | null;
  chainId: number | undefined;
}

interface Web3ProviderProps {
  children: ReactNode;
  library: Web3ProviderEthers | undefined;
  account: string | undefined | null;
  chainId: number | undefined;
}

const initialWeb3State: Web3State = {
  library: undefined,
  chainId: undefined,
  account: undefined,
};

const Web3Context = createContext<Web3State>({} as Web3State);

export const useKalyswapWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useKalyswapWeb3 must be used within a component wrapped with KalyswapWeb3Provider');
  }
  return context;
};

export const KalyswapWeb3Provider: FC<Web3ProviderProps> = ({
  children,
  library,
  chainId,
  account,
}: Web3ProviderProps) => {
  const [state, setState] = useState<Web3State>(initialWeb3State);

  useEffect(() => {
    setState({
      library,
      chainId: chainId || ChainId.KALYCHAIN,
      account,
    });
  }, [library, chainId, account]);

  return (
    <Web3Context.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;

export const useChainId = () => {
  const { chainId } = useKalyswapWeb3();
  return chainId || ChainId.KALYCHAIN;
};
