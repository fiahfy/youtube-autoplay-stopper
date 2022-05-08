import { Module } from 'vuex'
import { Settings } from '~/models'
import { State as RootState } from '~/store'

export type State = Settings

export const module: Module<State, RootState> = {
  namespaced: true,
  state: () => ({
    videoPageEnabled: true,
    channelPageEnabled: true,
  }),
  mutations: {
    setVideoPageEnabled(
      state,
      { videoPageEnabled }: { videoPageEnabled: boolean }
    ) {
      state.videoPageEnabled = videoPageEnabled
    },
    setChannelPageEnabled(
      state,
      {
        channelPageEnabled,
      }: {
        channelPageEnabled: boolean
      }
    ) {
      state.channelPageEnabled = channelPageEnabled
    },
  },
}
