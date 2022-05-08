import { InjectionKey } from 'vue'
import {
  Store,
  createStore as baseCreateStore,
  useStore as baseUseStore,
} from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as settings from '~/store/settings'

const vuexPersist = new VuexPersistence({
  storage: chrome.storage.local as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  asyncStorage: true,
  restoreState: async (key, storage) => {
    let state = {}
    try {
      const result = await storage?.get(key)
      const json = result[key]
      state = JSON.parse(json)
    } catch (e) {} // eslint-disable-line no-empty
    return state
  },
  saveState: async (key, state, storage) => {
    const json = JSON.stringify(state)
    await storage?.set({ [key]: json })
  },
})

export type State = {
  settings: settings.State
}

export const key: InjectionKey<Store<State>> = Symbol()

const createStore = () =>
  baseCreateStore<State>({
    modules: {
      settings: settings.module,
    },
    plugins: [
      vuexPersist.plugin,
      (store) => {
        store.subscribe(async () => {
          const settings = store.state.settings
          await chrome.runtime.sendMessage({
            type: 'settings-changed',
            data: { settings },
          })
        })
      },
    ],
  })

export const store = createStore()

export const readyStore = async () => {
  const store = createStore()
  // @see https://github.com/championswimmer/vuex-persist#how-to-know-when-async-store-has-been-replaced
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (store as any).restored
  return store
}

export const useStore = () => baseUseStore(key)
