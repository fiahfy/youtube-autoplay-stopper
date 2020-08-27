<template>
  <v-app>
    <v-main class="fill-height">
      <v-container fluid>
        <v-switch
          v-model="videoPageEnabled"
          label="Stop Autoplay on Video Page"
          dense
          hide-details
          class="mt-0"
        />
        <v-switch
          v-model="channelPageEnabled"
          label="Stop Autoplay on Channel Page"
          dense
          hide-details
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { settingsStore } from '~/store'

export default defineComponent({
  setup() {
    const videoPageEnabled = computed({
      get: () => {
        return settingsStore.videoPageEnabled
      },
      set: (value) => {
        settingsStore.setVideoPageEnabled({ videoPageEnabled: value })
      },
    })
    const channelPageEnabled = computed({
      get: () => {
        return settingsStore.channelPageEnabled
      },
      set: (value) => {
        settingsStore.setChannelPageEnabled({ channelPageEnabled: value })
      },
    })

    return {
      videoPageEnabled,
      channelPageEnabled,
    }
  },
})
</script>

<style lang="scss">
html {
  overflow-y: hidden;
}
</style>

<style lang="scss" scoped>
.v-application {
  width: 300px;
}
</style>
