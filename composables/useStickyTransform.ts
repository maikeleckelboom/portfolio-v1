import { clamp } from '@vueuse/shared'
import { Ref } from 'vue'

export const useStickyTransform = (target?: Ref<HTMLElement | undefined>) => {
  const height = ref<number>(unref(target)?.offsetHeight ?? 64)

  const { y } = useWindowScroll()

  const translateY = ref<number>(0)

  const clampHeader = (value: number) => clamp(value, 0, height.value)

  let raf: number | null = null

  watch(y, (currentY, nextY) => {
    if (raf) cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      translateY.value =
        currentY > nextY
          ? clampHeader(translateY.value + currentY - nextY)
          : clampHeader(translateY.value - nextY + currentY)
    })
  })

  const transform = computed(() => `translateY(-${translateY.value}px)`)

  return { translateY, transform }
}

export const useSharedStickyTransform =
  createSharedComposable(useStickyTransform)
