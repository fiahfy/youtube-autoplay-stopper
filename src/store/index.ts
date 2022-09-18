import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist'
import { localStorage } from 'redux-persist-webextension-storage'
import settingsReducer from './settings'

const reducers = combineReducers({
  settings: settingsReducer,
})

export const persistConfig = {
  key: 'root',
  storage: localStorage,
  version: 1,
  whitelist: ['settings'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    // @see https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

const store = makeStore()

store.subscribe(async () => {
  const settings = store.getState().settings
  await chrome.runtime.sendMessage({
    type: 'settings-changed',
    data: { settings },
  })
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
