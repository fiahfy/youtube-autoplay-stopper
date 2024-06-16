import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { Settings } from '~/models'
import { AppState } from '~/store'

type State = Settings

export const initialState: State = {
  channelPageEnabled: true,
  videoPageEnabled: true,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setChannelPageEnabled(state, action: PayloadAction<boolean>) {
      return { ...state, channelPageEnabled: action.payload }
    },
    setVideoPageEnabled(state, action: PayloadAction<boolean>) {
      return { ...state, videoPageEnabled: action.payload }
    },
  },
})

export const { setChannelPageEnabled, setVideoPageEnabled } =
  settingsSlice.actions

export default settingsSlice.reducer

export const selectSettings = (state: AppState) => state.settings

export const selectChannelPageEnabled = createSelector(
  selectSettings,
  (settings) => settings.channelPageEnabled,
)

export const selectVideoPageEnabled = createSelector(
  selectSettings,
  (settings) => settings.videoPageEnabled,
)
