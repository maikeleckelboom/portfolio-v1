<script lang="ts" setup>
import { IExperience } from '~/types/experience'
import humanizeDuration from 'humanize-duration'
import { ComputedRef } from 'vue'

const { data } = await useAsyncData(
  'experiences',
  async () =>
    await $fetch('/api/experiences', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) =>
      (data as IExperience[]).map(
        (experience) =>
          ({
            ...experience,
            expanded: false,
            date: {
              start: new Date(experience.dateStart).toLocaleDateString(
                'nl-NL',
                {
                  month: 'short',
                  year: 'numeric'
                }
              ),
              end: new Date(experience.dateEnd).toLocaleDateString('nl-NL', {
                month: 'short',
                year: 'numeric'
              }),
              duration: humanizeDuration(
                new Date(experience.dateEnd).getTime() -
                  new Date(experience.dateStart).getTime(),
                {
                  language: 'nl',
                  largest: 1
                }
              )
            }
          } as IExperience & {
            expanded: boolean
            date: {
              start: string
              end: string
              duration: string
            }
          })
      )
  }
)

const filters = ref<IFilter[]>([
  {
    name: 'job',
    label: 'Werk',
    icon: ['ic:round-cases', 'ic:round-check'],
    active: true
  },
  {
    name: 'internship',
    label: 'Stage',
    icon: ['ic:baseline-psychology', 'ic:round-check'],
    active: true
  }
])

const onFilterChange = (filter: IFilter) => {
  const f =
    filters.value[filters.value.findIndex((f) => f.name === filter.name)]
  f.active = !f.active
}

const sortDirection = ref<1 | -1>(-1)
const onSortChange = (sort: 1 | -1) => (sortDirection.value = sort)

const filtersFilter = (experience: IExperience) =>
  filters.value.filter((f) => f.active).some((f) => f.name === experience.type)

const sortFilter = (a: IExperience, b: IExperience) =>
  new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()

const filteredData = computed(() => {
  if (!data.value) {
    return []
  }
  const filtered = data.value!.filter(filtersFilter)
  return sortDirection.value === -1
    ? filtered.sort(sortFilter)
    : filtered.sort((a, b) => sortFilter(b, a))
}) as ComputedRef<
  (IExperience & {
    expanded: boolean
    date: {
      start: string
      end: string
      duration: string
    }
  })[]
>
</script>

<template>
  <div class="grid pb-2 pt-3">
    <div
      v-for="(portfolio, i) in filteredData"
      :key="portfolio.id"
      class="portfolio-card relative flex flex-col gap-2 pl-4"
    >
      <div
        :class="`absolute inset-y-0 left-0 flex w-1 bg-primary-container/50 ${
          i === 0 ? 'rounded-tl-md rounded-tr-md' : ''
        } ${
          i === filteredData.length - 1 ? 'rounded-bl-md rounded-br-md' : ''
        }`"
        class="absolute inset-y-0 left-0 flex w-1"
      >
        <!-- if not first and not last -->

        <div
          class="flex flex-col items-center justify-center rounded-full bg-surface text-body-small text-on-primary-container"
        >
          <span class="timeline-milestone">
            {{ yearFromShortDate(portfolio.date.end) }}
          </span>
          <span class="timeline-milestone">
            {{ yearFromShortDate(portfolio.date.start) }}
          </span>
        </div>
      </div>
      <div>
        <div
          class="relative mb-2 grid gap-y-2 rounded-md bg-surface-level-2 px-4 py-2 hover:bg-surface-level-3 active:bg-surface-level-4"
        >
          <!--          <div class="flex h-full flex-col px-0.5 py-1.5 text-end">-->
          <!--            <span class="text-label-medium tabular-nums">-->
          <!--              <span class="italic opacity-70">-->
          <!--                {{ monthFromShortDate(portfolio.date.end) }}-->
          <!--              </span>-->
          <!--              {{ yearFromShortDate(portfolio.date.end) }}-->
          <!--            </span>-->
          <!--            <span class="text-label-medium tabular-nums">-->
          <!--              <span class="italic opacity-70">-->
          <!--                {{ monthFromShortDate(portfolio.date.start) }}-->
          <!--              </span>-->
          <!--              {{ yearFromShortDate(portfolio.date.start) }}-->
          <!--            </span>-->
          <!--          </div>-->
          <div class="flex flex-col">
            <div class="flex flex-col">
              <h3 class="text-title-large leading-none">
                <span class="mb-0.5 text-title-medium">
                  {{ portfolio.roleName }}
                </span>
                <span class="h-0 w-full whitespace-nowrap">
                  <span class="text-sm"> @ </span>
                  <a :href="portfolio.companyWebsite" class="text-title-medium">
                    {{ portfolio.companyName }}
                    <Icon
                      class="h-3 w-3 text-primary"
                      name="ic:baseline-open-in-new"
                    />
                  </a>
                </span>
              </h3>
              <p class="mb-1.5 -skew-x-2 text-on-surface-variant">
                {{ portfolio.companyDescription }}
              </p>
            </div>
            <div v-if="portfolio.expanded">
              <div class="mb-1.5 flex flex-col gap-1">
                <ul class="pl-1">
                  <li
                    v-for="bulletPoint in portfolio.roleDescription
                      .split('--')
                      .slice(1)"
                    class="list-disc"
                  >
                    <span class="text-body-medium">
                      {{ bulletPoint }}
                    </span>
                  </li>
                </ul>
              </div>
              <div v-if="portfolio.tags" class="col-start-2">
                <TheTags :tags="portfolio.tags" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.timeline-milestone {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

ul:has(.list-disc) {
  list-style-position: inside;

  .list-disc {
    list-style-type: disc;

    &::marker {
      @apply flex items-center justify-center;
    }
  }
}
</style>
