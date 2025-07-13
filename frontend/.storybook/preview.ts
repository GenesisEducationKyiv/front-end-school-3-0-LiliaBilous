import type { Preview } from '@storybook/vue3-vite'
import '../src/assets/main.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;