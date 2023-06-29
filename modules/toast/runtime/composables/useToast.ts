export function useToastsContext() {
  return useState<Toast[]>('toasts', () => [])
}
