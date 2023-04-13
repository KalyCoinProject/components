# components
Ui Kit for Kalyswap

## Installation

`yarn add @kalycoinproject/components @gelatonetwork/limit-orders-react@2.4.0 @kalycoinproject/sdk`

or

`npm install @kalycoinproject/components @gelatonetwork/limit-orders-react@2.4.0 @kalycoinproject/sdk`

## Getting started

Wrap your app with the KalyswapProvider and pass the kalyswap reducers into your redux store.

In your store pass the gelato reducers:

```tsx
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import {
  kalyswapReducers,
  KALYSWAP_PERSISTED_KEYS,
} from "@kalycoinproject/components";

const PERSISTED_KEYS: string[] = ["your_keys", ...KALYSWAP_PERSISTED_KEYS];

const store = configureStore({
  reducer: {
    ...your_reducers,
    ...kalyswapReducers,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;
```

In your main file wrap your app with `KalyswapProvider`:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./state";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { KalyswapProvider } from "@kalycoinproject/components";
import getLibrary from "./utils/getLibrary";

const AppProvider = () => {
  const { library, account, chainId } = useWeb3React();

  return (
    <KalyswapProvider
      library={library}
      chainId={chainId}
      account={account as string}
    >
      <App />
    </KalyswapProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <AppProvider />
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

# development flow

1. do `yarn` in components
2. do `yarn dev` which will watch for any files changes and recompiles files
3. do `yalc link "@kalycoinproject/components"` in the project where you want to use components

Incase react hook violation error comes, in that case follow below steps also.

1. do `yarn link` in `<project_root>/node_modules/react`.
2. do `yarn link react` in components which will symlink react which are being used by project.

# Publish flow

- do `yarn publish` which will build the components and publish to npm.

# TODO

- getETHBalance ?
- DoubleCurrencyLogo wETH Contract.
- wETH, USDT, USDC, DAI token addresses