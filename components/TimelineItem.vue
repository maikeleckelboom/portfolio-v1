<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'

interface Props {
  item: ITimelineItem
  to?: string
  index?: number
  indicateLatest?: boolean
}

const { indicateLatest = true, ...props } = defineProps<Props>()

const LinkOrButtonComponent = shallowRef(
  props.to ? resolveComponent('NuxtLink') : 'button'
)

const navigateToWebsite = (item: ITimelineItem) => {
  if (!item.companyWebsite) return

  console.log('Stopped opening website')

  return

  // window.open(item.companyWebsite, '_blank')
}

const route = useRoute()

const isAtCurrentRoute = computed(() => {
  return route.path === props.to
})
</script>

<template>
  <Component
    :is="LinkOrButtonComponent"
    :class="{
      'border-primary bg-surface-level-1 outline outline-1 outline-offset-2 outline-transparent hover:border-primary':
        isAtCurrentRoute
    }"
    :to="to"
    class="group ml-3 flex max-w-full rounded-lg border-thin border-outline-variant px-4 py-4 transition-all hover:border-outline hover:bg-surface-level-1 md:ml-6"
  >
    <TimelineItemMilestone
      :class="isAtCurrentRoute ? ' bg-primary' : 'bg-surface'"
    />
    <span class="relative flex w-full flex-col">
      <TimelineItemTitle>
        <span class="mb-0.5 text-start text-title-medium">
          {{ item.roleName }}
        </span>
        <span class="mb-0.5 w-full whitespace-nowrap">
          <span class="ml-0.5 text-sm tracking-tight"> @ </span>
          <button
            class="text-title-medium text-primary"
            @click="navigateToWebsite(item)"
          >
            {{ item.companyName }}
            <Icon class="h-3 w-3 text-primary" name="ic:baseline-open-in-new" />
          </button>
        </span>
        <TimelineBadge v-if="indicateLatest && index === 0">
          Laatste
        </TimelineBadge>
      </TimelineItemTitle>
      <TimelineItemDates :dates="item.dates" />
    </span>
  </Component>
</template>
