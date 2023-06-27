<script lang="ts" setup>
import { animate, snap } from 'popmotion'
import { Ref } from 'vue'

const emit = defineEmits<{ (e: 'close'): void; (e: 'opened'): void }>()

const sheet = ref<HTMLElement>()

const offset = ref<number>(0)
const startOffsetTop = ref<number>(0)
const endOffsetTop: Ref<number> = useWindowSize().height
const isReady = ref<boolean>(false)

const getThresholdValues = () => {
  const screenHeight = unref(endOffsetTop)
  const { round } = Math
  const thresholds = {
    expanded: 0,
    halfExpanded: screenHeight - round(screenHeight * 0.5),
    collapsed: screenHeight - round(screenHeight * 0.25),
    hidden: screenHeight
  }
  return Object.values(thresholds)
}

const getOffsetTop = () => {
  const start = unref(startOffsetTop)
  const end = unref(endOffsetTop)
  const distance = unref(distanceY)
  const { abs, min, max } = Math
  return abs(min(max(start - distance, 0), end))
}

const onOpen = () => {
  const from = unref(endOffsetTop)
  const to = 0
  const onUpdate = (latest: number) => (offset.value = latest)
  const onComplete = () => {
    isReady.value = true
    emit('opened')
  }
  const options = { from, to, onUpdate, onComplete }
  animate(options)
}

const onClose = () => {
  const from = unref(offset)
  const to = unref(endOffsetTop)
  const onUpdate = (latest: number) => (offset.value = latest)
  const onComplete = () => emit('close')
  const options = { from, to, onUpdate, onComplete }
  animate(options)
}

const snapToClosestThreshold = () => {
  const from = getOffsetTop()
  const thresholdPoints = getThresholdValues()
  const snapTo = snap(thresholdPoints)
  const to = snapTo(offset.value)
  const onUpdate = (latest: number) => (offset.value = latest)
  const onComplete = () => {
    const end = unref(endOffsetTop)
    if (to === end) onClose()
  }
  const options = { from, to, onUpdate, onComplete }
  animate(options)
}

const updateOffsetTop = () => (offset.value = getOffsetTop())

const onSwipeStart = (ev: PointerEvent) => {
  startOffsetTop.value = offset.value
}

const onSwipe = () => {
  console.log('onSwipe')
  updateOffsetTop()
}

const onSwipeEnd = (ev: PointerEvent) => {
  updateOffsetTop()
  if (distanceY.value < -endOffsetTop.value * 0.35) {
    onClose()
    return
  }
  snapToClosestThreshold()
}

const { distanceY, isSwiping } = usePointerSwipe(sheet, {
  onSwipeStart,
  onSwipe,
  onSwipeEnd,
  threshold: 0
})

const transform = computed(() => `translate3d(0, ${offset.value}px, 0)`)

const opacity = computed(() => 1 - offset.value / endOffsetTop.value)

onMounted(() => onOpen())
</script>

<template>
  <div
    ref="sheet"
    :class="{ isSwiping }"
    :style="{ transform }"
    class="md-sheet"
  >
    <div class="sheet--container">
      <slot></slot>
      <BaseButton v-on:click="onClose"> Close</BaseButton>
    </div>
  </div>
  <div
    ref="scrim"
    :style="{ opacity }"
    class="sheet--scrim"
    v-on:click="onClose"
  />
</template>

<style lang="postcss">
.sheet--scrim {
  @apply pointer-events-none absolute inset-0 cursor-pointer bg-[rgba(0,0,0,0.75)] will-change-[opacity];
  contain: layout style paint;
}

.md-sheet {
  --sheet-inset-top: 40px;
  --sheet-border-radius: 28px;
  background: var(--md-sys-color-surface);
  transform: translate3d(0, 0, 0);
  contain: layout style paint;
  @apply absolute inset-[auto_0_0_0] z-30 flex
  h-[calc(100vh_-_var(--sheet-inset-top))] cursor-grab overscroll-contain rounded-tl-[--sheet-border-radius] rounded-tr-[--sheet-border-radius]
  pt-[--sheet-inset-top] will-change-transform after:pointer-events-none after:absolute after:left-2/4 after:top-[18px] after:h-0.5 after:w-7
  after:-translate-x-2/4 after:rounded-[28px] after:content-[''] supports-[height:100dvh]:h-[calc(100dvh_-_var(--sheet-inset-top))];

  &::after {
    background: var(--md-sys-color-surface-variant);
  }

  .sheet--container {
    @apply flex w-full select-none overflow-hidden;
    flex-flow: row wrap;
    padding-inline: 28px;
  }

  &.isSwiping {
    @apply cursor-grabbing touch-none;
  }

  &.isSwiping > * {
    @apply pointer-events-none;
  }
}
</style>
