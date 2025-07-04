import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/index.ts'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/assets/main.css'

const pinia = createPinia()
const app = createApp(App)

const toastContainer = document.createElement('div')
toastContainer.setAttribute('data-testid', 'toast-container')
document.body.appendChild(toastContainer)

app.use(Toast, {
  position: 'bottom-left',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  container: toastContainer,
})

app.use(pinia)
app.use(router)

app.mount('#app')
