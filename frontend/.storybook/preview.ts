import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import '../src/assets/main.css'
import { createPinia } from 'pinia'
setup((app) => {
  app.use(createPinia())
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      dark: { name: 'Dark', value: '#242323' },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
