import { GELATO_PERSISTED_KEYS, gelatoReducers } from '@gelatonetwork/limit-orders-react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple';
import papplication from './papplication/reducer';
import plists from './plists/reducer';
import pmulticall from './pmulticall/reducer';
import pswap from './pswap/reducer';
import ptoken from './ptoken/reducer';
import ptransactions from './ptransactions/reducer';
import puser from './puser/reducer';
import pwatchlists from './pwatchlists/reducer';

export const KALYSWAP_PERSISTED_KEYS: string[] = [
  'puser',
  'plists',
  'ptransactions',
  'pwatchlists',
  'ptoken',
  ...GELATO_PERSISTED_KEYS,
];

export const kalyswapReducers = {
  papplication,
  ptransactions,
  pswap,
  plists,
  pmulticall,
  puser,
  pwatchlists,
  ptoken,
  ...gelatoReducers,
};

const store = configureStore({
  reducer: kalyswapReducers,
  middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: KALYSWAP_PERSISTED_KEYS })],
  preloadedState: load({ states: KALYSWAP_PERSISTED_KEYS }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
