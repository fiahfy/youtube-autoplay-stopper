import browser from 'webextension-polyfill'
import { Settings } from '~/models'

let settings: Settings
let timer = -1

const isVideoUrl = () => new URL(location.href).pathname === '/watch'
const isChannelUrl = () =>
  new URL(location.href).pathname.indexOf('/channel') === 0

const querySelectorAsync = (
  selector: string,
  callback: (e: Element | null) => void,
  interval = 100,
  timeout = 1000
): number => {
  const expireTime = Date.now() + timeout
  return window.setInterval(() => {
    const e = document.querySelector(selector)
    if (e || Date.now() > expireTime) {
      clearInterval(timer)
      callback(e)
    }
  }, interval)
}

const init = async () => {
  const selector = (() => {
    switch (true) {
      case isVideoUrl() && settings.videoPageEnabled:
        return 'ytd-watch-flexy video.html5-main-video'
      case isChannelUrl() && settings.channelPageEnabled:
        return 'ytd-browse video.html5-main-video'
      default:
        return null
    }
  })()

  if (!selector) {
    return
  }

  clearInterval(timer)
  timer = querySelectorAsync(
    selector,
    (e) => {
      if (!e || !(e instanceof HTMLVideoElement)) {
        return
      }
      if (e.readyState > 0) {
        e.pause()
        return
      }
      const handleLoadStart = () => {
        e.pause()
        e.removeEventListener('canplay', handleLoadStart)
        e.removeEventListener('loadstart', handleLoadStart)
      }
      e.addEventListener('canplay', handleLoadStart)
      e.addEventListener('loadstart', handleLoadStart)
    },
    100,
    60000
  )
}

browser.runtime.onMessage.addListener(async (message) => {
  const { id, data } = message
  switch (id) {
    case 'urlChanged':
      settings = data.settings
      return init()
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  const data = await browser.runtime.sendMessage({ id: 'contentLoaded' })
  settings = data.settings
  init()
})
