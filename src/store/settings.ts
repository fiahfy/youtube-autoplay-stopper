import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ name: 'settings' })
export default class SettingsModule extends VuexModule {
  videoPageEnabled = true
  channelPageEnabled = true

  @Mutation
  setVideoPageEnabled({ videoPageEnabled }: { videoPageEnabled: boolean }) {
    this.videoPageEnabled = videoPageEnabled
  }
  @Mutation
  setChannelPageEnabled({
    channelPageEnabled,
  }: {
    channelPageEnabled: boolean
  }) {
    this.channelPageEnabled = channelPageEnabled
  }
}
