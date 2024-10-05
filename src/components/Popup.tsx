import {
  CssBaseline,
  FormControlLabel,
  FormGroup,
  GlobalStyles,
  Switch,
} from '@mui/material'
import type { ChangeEvent } from 'react'
import StoreProvider from '~/providers/StoreProvider'
import { useAppDispatch, useAppSelector } from '~/store'
import {
  selectChannelPageEnabled,
  selectVideoPageEnabled,
  setChannelPageEnabled,
  setVideoPageEnabled,
} from '~/store/settings'

const App = () => {
  const channelPageEnabled = useAppSelector(selectChannelPageEnabled)
  const videoPageEnabled = useAppSelector(selectVideoPageEnabled)
  const dispatch = useAppDispatch()

  const handleChangeChannelPageEnabled = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked
    dispatch(setChannelPageEnabled(value))
  }

  const handleChangeVideoPageEnabled = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked
    dispatch(setVideoPageEnabled(value))
  }

  return (
    <FormGroup sx={{ mx: 2, my: 1 }}>
      <FormControlLabel
        control={
          <Switch
            checked={videoPageEnabled}
            onChange={handleChangeVideoPageEnabled}
          />
        }
        label="Turn off on Video Page"
      />
      <FormControlLabel
        control={
          <Switch
            checked={channelPageEnabled}
            onChange={handleChangeChannelPageEnabled}
          />
        }
        label="Turn off on Channel Page"
      />
    </FormGroup>
  )
}

const Popup = () => {
  return (
    <StoreProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { overflowY: 'hidden', width: 280 },
        }}
      />
      <App />
    </StoreProvider>
  )
}

export default Popup
