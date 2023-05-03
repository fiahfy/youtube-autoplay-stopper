import { createRoot } from 'react-dom/client'
import Popup from '~/components/Popup'

const container = document.querySelector('#app') as Element
const root = createRoot(container)
root.render(<Popup />)
