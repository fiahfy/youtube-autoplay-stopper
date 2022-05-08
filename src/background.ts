import { Settings } from '~/models'
import { readyStore } from '~/store'

const getSettings = async () => {
  const store = await readyStore()
  return JSON.parse(JSON.stringify(store.state.settings))
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
    } catch (e) {} // eslint-disable-line no-empty
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
