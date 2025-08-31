import type { Settings } from '~/models'
import { persistConfig } from '~/store'
import { initialState as initialSettings } from '~/store/settings'

const getSettings = async () => {
  try {
    const key = `persist:${persistConfig.key}`
    const json = (await chrome.storage.local.get(key))[key]
    const rootState = JSON.parse(json)
    return JSON.parse(rootState.settings)
  } catch {
    return initialSettings
  }
}

const contentLoaded = async () => {
  const settings = await getSettings()

  return { settings }
}

const settingsChanged = async (settings: Settings) => {
  const tabs = await chrome.tabs.query({ url: 'https://www.youtube.com/*' })
  for (const tab of tabs) {
    try {
      tab.id &&
        chrome.tabs.sendMessage(tab.id, {
          type: 'settings-changed',
          data: { settings },
        })
    } catch {
      // noop
    }
  }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url) {
    await chrome.tabs.sendMessage(tabId, { type: 'url-changed' })
  }
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const { type, data } = message
  switch (type) {
    case 'content-loaded':
      contentLoaded().then((data) => sendResponse(data))
      return true
    case 'settings-changed':
      settingsChanged(data.settings).then(() => sendResponse())
      return true
  }
})
