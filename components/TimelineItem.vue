<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'
import IsInternshipIcon from '~/components/IsInternshipIcon.vue'

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

const isAtCurrentRoute = computed(() => route.path === props.to)
</script>

<template>
  <Component
    :is="LinkOrButtonComponent"
    :class="{
      'border-primary bg-surface-level-1 outline outline-1 outline-offset-2 outline-transparent hover:border-primary':
        isAtCurrentRoute
    }"
    :to="to"
    class="group ml-6 flex w-full flex-col rounded-lg border-thin transition-all hover:border-primary hover:bg-surface-level-1"
  >
    <TimelineItemMilestone
      :class="isAtCurrentRoute ? ' bg-primary' : 'bg-surface'"
    />

    <span class="relative flex h-full w-full flex-col p-5">
      <TimelineItemTitle>
        <span
          :class="
            item.type === 'job' ? 'text-title-medium' : 'text-title-medium'
          "
          class="mb-0.5 text-start"
        >
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
      <IsInternshipIcon
        v-if="item.type === 'internship'"
        class="absolute right-2 top-1/2 -translate-y-1/2"
      />
    </span>
  </Component>
</template>
