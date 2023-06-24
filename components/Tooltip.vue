<script lang="ts" setup>
import { tv } from 'tailwind-variants'

type IButtons = {
  label: string
  onClick: () => void
}

const props = defineProps<{
  variant: 'plain' | 'rich'
  text?: string
  subhead?: string
  buttons?: IButtons[]
}>()

const isPlain = computed(() => props.variant === 'plain')

const { variant } = toReactive(props)

const variants = tv({
  variants: {
    variant: {
      plain: {
        container:
          'min-h-[24px] h-fit w-fit px-[8px] py-[2px] flex justify-center items-center my-[4px]',
        text: ''
      },
      rich: {
        container:
          'bg-surface-container pt-[12px] px-[16px] pb-[8px] w-fit min-w-[128px] shadow-md',
        icon: 'text-on-surface-variant',
        text: 'text-on-surface-variant',
        subhead: 'text-on-surface-variant pb-[4px]',
        button: 'text-title-medium '
      }
    }
  },
  slots: {
    text: 'text-body-small text-surface',
    container: 'flex flex-col bg-inverse-surface rounded-lg',
    subhead: 'text-title-small text-on-surface-variant flex font-semibold',
    button: 'min-h-[48px] px-2'
  }
})

const { container, subhead, text, button } = variants({ variant })
</script>

<template>
  <div :class="container()">
    <slot name="title"></slot>
    <span v-if="!isPlain && props.subhead" :class="subhead()">
      <slot name="subhead">
        {{ props.subhead }}
      </slot>
    </span>
    <span :class="text()">
      <slot>
        {{ props.text }}
      </slot>
    </span>
    <div class="flex flex-nowrap">
      <slot name="actions">
        <div
          v-if="buttons?.length"
          class="mt-[12px] flex flex-nowrap gap-2 text-primary"
        >
          <button
            v-for="btn in props.buttons"
            :key="btn.label"
            :class="button()"
            @click="btn.onClick"
          >
            {{ btn.label }}
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
