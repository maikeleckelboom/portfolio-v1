const removeFirstSlash = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
type Crumb = {
  path: string
  name: string
}

export const useBreadcrumbs = () => {
  const router = useRouter()
  const currentRoute = computed(() => router.currentRoute.value)

  const breadcrumbs = computed<Crumb[]>(() => {
    const crumbs = removeFirstSlash(currentRoute.value.path).split('/')
    return [
      { path: '', name: 'Portfolio' },
      ...crumbs.map((crumb, index) => ({
        path: crumbs.slice(0, index + 1).join('/'),
        name: crumb
      }))
    ]
  })

  const isLastCrumb = (crumb: Crumb) => crumb.path === currentRoute.value.path
  const isCurrentCrumb = (crumb: Crumb) =>
    crumb.path === currentRoute.value.path
  const isNotLastCrumb = (crumb: Crumb) =>
    crumb.path !== currentRoute.value.path
  const navigateToCrumb = (crumb: Crumb) => router.push(crumb.path)
  const isNotFirstCrumb = (crumb: Crumb) =>
    crumb.path !== breadcrumbs.value[0].path
  const isNotCurrentCrumb = (crumb: Crumb) =>
    crumb.path !== removeFirstSlash(currentRoute.value.path)

  return {
    breadcrumbs,
    isLastCrumb,
    isCurrentCrumb,
    isNotLastCrumb,
    navigateToCrumb,
    isNotFirstCrumb,
    isNotCurrentCrumb
  }
}
