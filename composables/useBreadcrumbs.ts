import { MaybeRef } from '@vueuse/core'

export interface Breadcrumb {
  path: string
  name: string
}

export type Breadcrumbs = Breadcrumb[]

interface BreadCrumbOptions {}

export const useBreadcrumbs = (options?: BreadCrumbOptions) => {
  const router = useRouter()
  const currentRoute = computed(() => router.currentRoute.value)

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const crumbs = removeFirstSlash(currentRoute.value.path).split('/')
    return [
      { path: '', name: 'Startpagina' },
      ...crumbs.map((crumb, index) => ({
        path: crumbs.slice(0, index + 1).join('/'),
        name: crumb
      }))
    ]
  })

  const removeFirstSlash = (path: string) => {
    return path.startsWith('/') ? path.slice(1) : path
  }
  const isLastCrumb = (crumb: Breadcrumb) =>
    crumb.path === currentRoute.value.path
  const isCurrentCrumb = (crumb: Breadcrumb) =>
    crumb.path === currentRoute.value.path
  const isNotLastCrumb = (crumb: Breadcrumb) =>
    crumb.path !== currentRoute.value.path
  const navigateToCrumb = (crumb: Breadcrumb) => router.push(crumb.path)
  const isNotFirstCrumb = (crumb: Breadcrumb) =>
    crumb.path !== breadcrumbs.value[0].path
  const isNotCurrentCrumb = (crumb: Breadcrumb) =>
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
