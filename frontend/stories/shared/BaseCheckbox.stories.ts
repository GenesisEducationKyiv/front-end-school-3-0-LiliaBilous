import BaseCheckbox from '@/shared/components/ui/BaseCheckbox.vue'

export default {
  title: 'Shared/BaseCheckbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    dataTestid: { control: 'text' },
    ariaLabel: { control: 'text' },
    id: { control: 'text' },
    default: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Компонент BaseCheckbox реалізує чекбокс, взятий з дизайн-системи Material 3 (https://m3.material.io) та стилізований під головну дизайн-систему проєкту.`,
      },
    },
  },
}

const render = (args: {
  checked?: boolean
  dataTestid: string
  ariaLabel: string
  id: string
  default?: string
}) => ({
  components: { BaseCheckbox },
  setup() {
    return { args }
  },
  template: `
    <BaseCheckbox 
      v-bind="args"
    >
      {{ args.default }}
    </BaseCheckbox>
  `,
})

export const Default = {
  args: {
    checked: false,
    default: 'Label text',
    dataTestid: 'base-checkbox',
    ariaLabel: 'Base Checkbox',
  },
  render,
}

export const Checked = {
  args: {
    checked: true,
    default: 'Checked state',
  },
  render,
}
