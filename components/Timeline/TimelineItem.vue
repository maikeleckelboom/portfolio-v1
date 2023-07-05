<script lang="ts" setup>
import { ITimelineItem } from '~/types/portfolio'
import IsInternshipIcon from '~/components/IsInternshipIcon.vue'

interface Props {
  item: ITimelineItem
  to?: string
  index?: number
  active?: boolean
  indicateLatest?: boolean
}

const { indicateLatest = true, ...props } = defineProps<Props>()

const LinkOrButtonComponent = shallowRef(
  props.to ? resolveComponent('NuxtLink') : 'button'
)

const navigateToWebsite = (item: ITimelineItem) => {
  if (!item.companyWebsite) return
  // TODO: Dialog!
  return

  // window.open(item.companyWebsite, '_blank')
}

const route = useRoute()

const isAtCurrentRoute = computed(() => route.path === props.to)
</script>

<template>
  <Component
    :is="LinkOrButtonComponent"
    data-component="TimelineItem"
    :class="{
      'selected border-primary bg-surface-level-1 outline outline-1 outline-offset-2 outline-transparent':
        isAtCurrentRoute
    }"
    :to="to"
    class="group ml-6 flex w-full flex-col rounded-lg border bg-surface hover:border-primary"
  >
    <TimelineItemMilestone
      class="   "
      :class="isAtCurrentRoute ? ' bg- border' : ' border bg-surface '"
    />

    <span
      class="relative flex h-full w-full flex-col rounded-lg bg-surface p-5 group-hover:bg-surface-level-1"
    >
      <TimelineItemTitle>
        <span
          :class="
            item.type === 'job' ? 'text-title-medium' : 'text-title-medium'
          "
          class="mb-0.5 text-start"
        >
          {{ item.roleName }}
        </span>
        <span class="mb-0.5 w-full transform whitespace-nowrap">
          <button
            class="-skew-x-3 pl-1.5 text-title-medium text-secondary"
            @click="navigateToWebsite(item)"
          >
            @{{ item.companyName }}
            <Icon class="hidden h-3 w-3" name="ic:baseline-open-in-new" />
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

<style scoped lang="postcss"></style>
