interface Toast {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

export function useToaster() {
  const toasts = useState<Toast[]>('toasts', () => [])

  const toast = async (message: string, type: Toast['type'] = 'info') => {
    toasts.value.push({ message, type })

    setTimeout(() => {
      console.log('Toast timeout ran out')
      toasts.value.shift()
    }, 5000)
  }

  return {
    toasts,
    toast
  }
}
