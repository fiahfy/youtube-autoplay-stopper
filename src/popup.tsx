import { createRoot } from 'react-dom/client'
import App from '~/components/App'

const container = document.querySelector('#app')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(<App />)
