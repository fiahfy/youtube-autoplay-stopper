import {
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  GlobalStyles,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import type { ChangeEvent } from 'react'
import StoreProvider from '~/providers/StoreProvider'
import { useAppDispatch, useAppSelector } from '~/store'
import {
  selectChannelPageDisabled,
  selectVideoPageDisabled,
  setChannelPageDisabled,
  setVideoPageDisabled,
} from '~/store/settings'

const App = () => {
  const channelPageDisabled = useAppSelector(selectChannelPageDisabled)
  const videoPageDisabled = useAppSelector(selectVideoPageDisabled)
  const dispatch = useAppDispatch()

  const handleChangeChannelPageDisabled = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.currentTarget.checked
    dispatch(setChannelPageDisabled(value))
  }

  const handleChangeVideoPageDisabled = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked
    dispatch(setVideoPageDisabled(value))
  }

  return (
    <Container>
      <Stack spacing={2} sx={{ my: 2, userSelect: 'none' }}>
        <FormControl component="fieldset" size="small">
          <FormLabel component="legend">
            <Typography gutterBottom variant="subtitle2">
              Autoplay settings
            </Typography>
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={videoPageDisabled}
                  onChange={handleChangeVideoPageDisabled}
                  size="small"
                />
              }
              label="Disable on video pages"
              slotProps={{ typography: { variant: 'body2' } }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={channelPageDisabled}
                  onChange={handleChangeChannelPageDisabled}
                  size="small"
                />
              }
              label="Disable on channel pages"
              slotProps={{ typography: { variant: 'body2' } }}
            />
          </FormGroup>
        </FormControl>
      </Stack>
    </Container>
  )
}

const Popup = () => {
  return (
    <StoreProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { overflowY: 'hidden', width: 300 },
        }}
      />
      <App />
    </StoreProvider>
  )
}

export default Popup
