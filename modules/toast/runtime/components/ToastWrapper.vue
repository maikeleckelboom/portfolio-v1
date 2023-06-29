<script lang="ts" setup>
const toasts = useState<Toast[]>('toasts', () => [])

const elToastGroup = ref<HTMLElement>()
const elToasts = ref<HTMLOutputElement[]>([])

const createToast = (text) => ({
  id: window.crypto.randomUUID(),
  text
})

const addToast = (toast) => {
  toasts.value.push(toast)
}

const doToast = async (text: string, duration = 5000) => {
  const toast = createToast(text)
  const expires = Date.now() + duration

  addToast({ ...toast, expires })

  return new Promise(async (resolve) => {
    await useTimeoutFn(() => {
      toasts.value = toasts.value.filter((t) => t.id !== toast.id)
    }, duration)

    resolve()
  })
}

const sendToast = async () => {
  console.log('toasting ...')
  await doToast('Hello World')
  console.log('toasting done 😊')
}
</script>

<template>
  <button
    class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    @click="sendToast"
  >
    Toast
  </button>
  <div
    ref="elToastGroup"
    class="inset-block-end-0 inset-inline-0 padding-block-end-5vh pointer-events-none fixed z-20 grid justify-center justify-items-center gap-4"
  >
    <output
      v-for="toast in toasts"
      ref="elToasts"
      aria-live="polite"
      class="toast rounded-md bg-inverse-primary text-on-inverse-primary will-change-transform"
      role="status"
    >
      {{ toast.text }}
    </output>
  </div>
</template>

<style lang="postcss"></style>
