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
    <FormGroup sx={{ gap: 1, mx: 2, my: 1, userSelect: 'none' }}>
      <FormControlLabel
        control={
          <Switch
            checked={videoPageEnabled}
            onChange={handleChangeVideoPageEnabled}
            size="small"
          />
        }
        label="Turn off on Video Page"
        slotProps={{ typography: { variant: 'body2' } }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={channelPageEnabled}
            onChange={handleChangeChannelPageEnabled}
            size="small"
          />
        }
        label="Turn off on Channel Page"
        slotProps={{ typography: { variant: 'body2' } }}
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
          html: { overflowY: 'hidden', width: 250 },
        }}
      />
      <App />
    </StoreProvider>
  )
}

export default Popup
