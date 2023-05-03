import { Settings } from '~/models'

let settings: Settings
let timer = -1

const getPageType = () => {
  const url = new URL(location.href)
  switch (true) {
    case !!url.pathname.match(/^\/watch$/):
      return 'video'
    case !!url.pathname.match(/^\/channel\/[^/]+$/) ||
      !!url.pathname.match(/^\/@[^/]+(\/featured)?$/):
      return 'channel'
    default:
      return null
  }
}

const isEnabled = (type: 'video' | 'channel') =>
  type === 'video' ? settings.videoPageEnabled : settings.channelPageEnabled

const getSelector = (type: 'video' | 'channel') =>
  type === 'video'
    ? 'ytd-watch-flexy video.html5-main-video'
    : 'ytd-browse video.html5-main-video'

const querySelectorAsync = (
  selector: string,
  callback: (e: Element | null) => void,
  interval = 100,
  timeout = 10000
) => {
  const expireTime = Date.now() + timeout
  return window.setInterval(() => {
    const e = document.querySelector(selector)
    if (e || Date.now() > expireTime) {
      clearInterval(timer)
      callback(e)
    }
  }, interval)
}

const init = () => {
  clearInterval(timer)

  const type = getPageType()
  if (!type) {
    return
  }

  const needPause = isEnabled(type)
  if (!needPause) {
    return
  }

  const selector = getSelector(type)

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

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const { type, data } = message
  switch (type) {
    case 'url-changed':
      init()
      return sendResponse()
    case 'settings-changed':
      settings = data.settings
      return sendResponse()
  }
})

chrome.runtime.sendMessage({ type: 'content-loaded' }).then((data) => {
  settings = data.settings
  init()
})
