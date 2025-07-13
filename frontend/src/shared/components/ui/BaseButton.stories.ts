import BaseButton from '@/shared/components/ui/BaseButton.vue'

export default {
    title: 'Shared/BaseButton',
    component: BaseButton,
    tags: ['autodocs'],
    argTypes: {
        ariaLabel: { control: 'text' },
        dataTestid: { control: 'text' },
        buttonClass: { control: 'text' },
        onClick: { action: 'clicked' },
        default: { control: 'text' },
    },
}

const render = (args: {
    ariaLabel?: string
    dataTestid?: string
    buttonClass?: string | string[]
    default?: string
    onClick?: (event: MouseEvent) => void
}) => ({
    components: { BaseButton },
    setup() {
        return { args }
    },
    template: `
    <BaseButton v-bind="args" @click="args.onClick">
      {{ args.default }}
    </BaseButton>
  `,
})

export const Primary = {
    args: {
        default: 'Primary',
        buttonClass: 'button button-primary',
    },
    render,
}

export const Secondary = {
    args: {
        default: 'Secondary',
        buttonClass: 'button button-secondary',
    },
    render,
}

export const Outline = {
    args: {
        default: 'Outline',
        buttonClass: 'button button-outline',
    },
    render,
}

export const Danger = {
    args: {
        default: 'Delete',
        buttonClass: 'button button-danger',
    },
    render,
}

export const Disabled = {
    args: {
        default: 'Disabled',
        buttonClass: 'button button-disabled',
    },
    render,
}
