import 'vuetify/styles'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from '~/components/App.vue'
import { key, store } from '~/store'

const app = createApp(App)
const vuetify = createVuetify()

app.use(store, key)
app.use(vuetify)
app.mount('#app')
