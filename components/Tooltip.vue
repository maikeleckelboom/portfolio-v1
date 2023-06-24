<script lang="ts" setup>
import { tv } from 'tailwind-variants'
import { MaybeElementRef } from '@vueuse/core'

type IButtons = {
  label: string
  onClick: () => void
}

const props = withDefaults(
  defineProps<{
    target?: MaybeElementRef
    variant: 'plain' | 'rich'
    text?: string
    subhead?: string
    buttons?: IButtons[]
  }>(),
  {
    variant: 'plain'
  }
)

const { target } = toRefs(props)

const isPlain = computed(() => props.variant === 'plain')

const { variant } = toReactive(props)

const variants = tv({
  variants: {
    variant: {
      plain: {
        container:
          'min-h-[24px] h-fit w-fit px-[8px] py-[2px] flex justify-center items-center rounded-md'
      },
      rich: {
        container:
          'bg-surface-container pt-[12px] px-[16px] pb-[8px] w-fit min-w-[128px] shadow-md rounded-lg',
        icon: 'text-on-surface-variant',
        text: 'text-on-surface-variant',
        subhead: 'text-on-surface-variant pb-[4px]',
        button: 'text-title-medium '
      }
    }
  },
  slots: {
    text: 'text-body-small text-surface',
    container: 'absolute z-10 flex flex-col bg-inverse-surface',
    subhead: 'text-title-small text-on-surface-variant flex font-semibold',
    button: 'min-h-[48px] px-2'
  }
})

const { container, subhead, text, button } = variants({ variant })

const tooltipRef = ref<HTMLElement>()

const { x, y } = useMouse({ touch: false })
watch(
  [x, y],
  ([x, y]) => {
    if (!tooltipRef.value) return
    tooltipRef.value.style.left = `${x}`
    tooltipRef.value.style.top = `${y}`
  },
  { immediate: true }
)

const followMouse = computed(() => {
  const elTarget = unrefElement(props.target)
  if (!elTarget) return false
  const pointEls = document.elementsFromPoint(x.value, y.value)
  return pointEls.some((el) => elTarget.contains(el))
})

watch(followMouse, (bool: boolean) => {
  console.log(bool ? 'mouse is over' : 'mouse is not over')
})
</script>

<template>
  <div
    ref="tooltipRef"
    :class="
      container({ class: `${followMouse ? 'opacity-100' : 'opacity-0'}` })
    "
    data-tooltip="true"
  >
    <slot name="title"></slot>
    <span v-if="!isPlain && props.subhead" :class="subhead()">
      <slot name="subhead">
        {{ props.subhead }}
      </slot>
    </span>
    <span :class="text()">
      <slot name="text">
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
  <slot></slot>
</template>

<style lang="postcss" scoped>
[data-tooltip] {
}
</style>
