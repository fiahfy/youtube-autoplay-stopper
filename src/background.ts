import { browser } from 'webextension-polyfill-ts'
import { readyStore } from '~/store'

const getSettings = async () => {
  const store = await readyStore()
  return JSON.parse(JSON.stringify(store.state.settings))
}

const contentLoaded = async (tabId: number) => {
  await browser.pageAction.show(tabId)

  const settings = await getSettings()

  return { settings }
}

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url) {
    const settings = await getSettings()
    browser.tabs.sendMessage(tabId, { id: 'urlChanged', data: { settings } })
  }
})

browser.runtime.onMessage.addListener(async (message, sender) => {
  const { id } = message
  const { tab } = sender
  switch (id) {
    case 'contentLoaded':
      return tab?.id && (await contentLoaded(tab.id))
  }
})
