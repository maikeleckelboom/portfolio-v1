<script lang="ts" setup>
import { animate, snap } from 'popmotion'
import { type Ref } from 'vue'

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
    // halfExpanded: screenHeight - round(screenHeight * 0.5),
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
    emit('opened')
    isReady.value = true
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

onMounted(updateOffsetTop)
</script>

<template>
  <div class="flex h-screen">
    <div
      ref="sheet"
      :class="{ isSwiping }"
      :style="{ transform }"
      class="md-sheet touch-none"
    >
      <PageContainer class="px-7">
        <slot></slot>
        <BaseButton v-on:click="onClose" class="mx-2 mt-8 w-fit px-6">
          Close
        </BaseButton>
      </PageContainer>
    </div>
    <div
      ref="scrim"
      :style="{ opacity }"
      class="sheet--scrim"
      v-on:click="onClose"
    />
  </div>
</template>

<style>
@import 'assets/css/keyframes.css';

.sheet--scrim {
  @apply pointer-events-none absolute inset-0 cursor-pointer bg-[rgba(0,0,0,0.75)] will-change-[opacity];
  contain: layout style paint;
}

.md-sheet {
  @apply absolute inset-[auto_0_0_0] z-30 flex h-[calc(100vh_-_var(--sheet-inset-top))]
  cursor-grab touch-none overscroll-contain rounded-tl-[--sheet-border-radius] rounded-tr-[--sheet-border-radius]
  pt-[--sheet-inset-top] will-change-transform after:pointer-events-none after:absolute after:left-2/4 after:top-[18px] after:h-0.5 after:w-7
  after:-translate-x-2/4 after:rounded-[28px] after:bg-on-surface after:content-[''] supports-[height:100dvh]:h-[calc(100dvh_-_var(--sheet-inset-top))];

  --sheet-inset-top: 40px;
  --sheet-border-radius: 28px;
  background: var(--md-sys-color-surface);
  transform: translate3d(0, 0, 0);
  contain: layout style paint;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: var(--md-sys-color-surface) transparent;
  overscroll-behavior-y: contain;

  &.isSwiping {
    @apply cursor-grabbing touch-none [&*]:pointer-events-none;
  }

  view-transition-name: sheet;
}

::view-transition-old(sheet):only-child {
  animation-name: slide-out-to-bottom;
}

::view-transition-new(sheet):only-child {
  animation-name: slide-in-from-bottom;
  @apply transition-transform duration-500 ease-out;
}
</style>
