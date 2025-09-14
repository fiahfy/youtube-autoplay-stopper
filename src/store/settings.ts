import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { Settings } from '~/models'
import type { AppState } from '~/store'

type State = Settings

export const initialState: State = {
  channelPageDisabled: true,
  videoPageDisabled: true,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setChannelPageDisabled(state, action: PayloadAction<boolean>) {
      return { ...state, channelPageDisabled: action.payload }
    },
    setVideoPageDisabled(state, action: PayloadAction<boolean>) {
      return { ...state, videoPageDisabled: action.payload }
    },
  },
})

export const { setChannelPageDisabled, setVideoPageDisabled } =
  settingsSlice.actions

export default settingsSlice.reducer

export const selectSettings = (state: AppState) => state.settings

export const selectChannelPageDisabled = createSelector(
  selectSettings,
  (settings) => settings.channelPageDisabled,
)

export const selectVideoPageDisabled = createSelector(
  selectSettings,
  (settings) => settings.videoPageDisabled,
)
