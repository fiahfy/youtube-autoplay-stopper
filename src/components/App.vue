<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '~/store'

const store = useStore()

const videoPageEnabled = computed({
  get: () => store.state.settings.videoPageEnabled,
  set: (value) =>
    store.commit('settings/setVideoPageEnabled', {
      videoPageEnabled: value,
    }),
})
const channelPageEnabled = computed({
  get: () => store.state.settings.channelPageEnabled,
  set: (value) =>
    store.commit('settings/setChannelPageEnabled', {
      channelPageEnabled: value,
    }),
})
</script>

<template>
  <v-app>
    <v-main class="fill-height">
      <v-container fluid>
        <v-switch
          v-model="videoPageEnabled"
          color="primary"
          density="compact"
          hide-details
          label="Stop Autoplay on Video Page"
        />
        <v-switch
          v-model="channelPageEnabled"
          color="primary"
          density="compact"
          hide-details
          label="Stop Autoplay on Channel Page"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
html {
  overflow-y: hidden;
}
</style>

<style lang="scss" scoped>
.v-application {
  width: 320px;
}
</style>
