import { useToastsContext } from '~/modules/toast/runtime/composables/useToast'

export default defineNuxtPlugin(() => {
  console.log('Toast plugin loaded 🍞')

  const toasts = useToastsContext()

  return {
    provide: {
      toasts
    }
  }
})
