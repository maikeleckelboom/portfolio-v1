<script lang="ts" setup>
import humanizeDuration from 'humanize-duration'

const { data } = await useAsyncData(
  'experiences',
  async () =>
    await $fetch('/api/experiences', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) =>
      (data as any[]).map(
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
          } as any & {
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
</script>

<template>
  <ol
    class="relative flex h-full min-h-[calc(100dvh-66px)] flex-col gap-y-8 border-l"
  >
    <li>
      <h1
        id="title-werkervaring"
        class="pl-6 text-headline-medium md:text-headline-large"
      >
        Werkervaring
      </h1>
    </li>
    <li v-for="(portfolio, n) in data" :key="n">
      <NuxtLink
        :to="`/portfolio/${portfolio.id}`"
        class="group ml-6 flex w-full rounded-lg border-thin border-outline-variant px-4 py-4 hover:border-outline hover:bg-surface-level-1"
      >
        <div
          class="absolute -left-2 mt-1 h-4 w-4 rounded-full border border-outline bg-surface group-hover:border-primary group-hover:bg-primary peer-hover:bg-primary hover:border-primary hover:bg-primary"
        />
        <div class="relative flex w-full flex-col">
          <h3 class="mb-1 text-base font-normal">
            <span class="mb-0.5 text-title-medium">
              {{ portfolio.roleName }}
            </span>
            <span class="w-full whitespace-nowrap">
              <span class="text-sm"> @ </span>
              <a
                :href="portfolio.companyWebsite"
                class="mt-1 text-title-medium"
              >
                {{ portfolio.companyName }}
                <Icon
                  class="h-3 w-3 text-primary"
                  name="ic:baseline-open-in-new"
                />
              </a>
            </span>
            <span
              v-if="n === 0"
              class="absolute right-0 top-0 inline-flex items-center rounded-md bg-primary-container px-2.5 py-0.5 text-label-small font-bold uppercase leading-4 text-on-primary-container"
            >
              Laatste
            </span>
          </h3>
          <time class="mb-0.5 flex text-sm font-normal leading-none">
            <span class="text-label-medium tabular-nums">
              <span class="italic opacity-70">
                {{ monthFromShortDate(portfolio.date.start) }}
              </span>
              {{ yearFromShortDate(portfolio.date.start) }}
            </span>
            <span class="mx-1">-</span>
            <span class="text-label-medium tabular-nums">
              <span class="italic opacity-70">
                {{ monthFromShortDate(portfolio.date.end) }}
              </span>
              {{ yearFromShortDate(portfolio.date.end) }}
            </span>
            <span class="ml-2 text-label-medium tabular-nums">
              ({{ portfolio.date.duration }})
            </span>
          </time>
        </div>
      </NuxtLink>
    </li>
  </ol>
</template>

<style lang="postcss">
#title-werkervaring {
  &::before {
    content: '';
    position: absolute;
    left: -1px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: repeating-linear-gradient(
      0,
      var(--md-sys-color-primary) 0px,
      var(--md-sys-color-primary) 10px,
      var(--md-sys-color-background) 10px,
      var(--md-sys-color-background) 20px,
      var(--md-sys-color-background) 20px
    );
    height: 96px;
  }
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
