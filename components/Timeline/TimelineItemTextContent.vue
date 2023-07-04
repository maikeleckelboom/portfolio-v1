<script lang="ts" setup>
const props = defineProps<{
  item: TimelineItem
}>()
</script>

<template>
  <Transition
    appear
    appear-active-class="transition-all duration-300 ease-in"
    appear-to-class="opacity-0 translate-y-0"
    appear-class="opacity-0 -translate-y-[12px]"
  >
    <div class="flex flex-col">
      <fieldset class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Functietitel
          </sub>
          <h1 class="mb-4 text-body-large">{{ item.roleName }}</h1>
        </div>
        <div class="flex flex-col">
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Dienstverband
          </sub>
          <h1 class="mb-4 text-body-large capitalize">
            {{ item.type === 'job' ? 'Baan' : 'Stage' }}
            <span>- {{ item.contractType }}</span>
          </h1>
        </div>
      </fieldset>
      <fieldset class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Bedrijf
          </sub>
          <h1 class="mb-4 text-body-large">{{ item.companyName }}</h1>
        </div>
        <div class="flex flex-col">
          <sub
            class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
          >
            Locatie
          </sub>
          <h1 class="mb-4 text-body-large">{{ item.companyLocation }}</h1>
        </div>
      </fieldset>
      <fieldset>
        <sub
          class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
        >
          Bedrijfsomschrijving
        </sub>
        <h1 class="mb-4 text-body-large">
          {{ item.companyDescription }}
        </h1>
      </fieldset>
      <fieldset>
        <sub
          class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
        >
          Periode
        </sub>
        <h1 class="mb-4 text-body-large">
          {{ item.dates.start }} - {{ item.dates.end }} ({{
            item.dates.duration
          }})
        </h1>
      </fieldset>
      <fieldset>
        <sub
          class="mb-1.5 flex -skew-x-6 flex-col text-label-small text-on-surface-variant md:text-label-medium"
        >
          Taken en verantwoordelijkheden
        </sub>
        <ul class="">
          <li
            v-for="listItem in item.roleDescription.split('--').slice(1)"
            class="list-disc pl-5 text-body-large"
          >
            {{ listItem }}
          </li>
        </ul>
      </fieldset>
      <fieldset class="mt-6 flex">
        <TheTags :tags="item.tags" />
      </fieldset>
    </div>
  </Transition>
</template>

<style lang="postcss">
.TimelineTextContent {
  view-transition-name: timelineTextContent;
}

::view-transition-old(timelineTextContent) {
}

::view-transition-new(timelineTextContent):only-child {
  background: red;
}

::view-transition-old(timelineTextContent),
::view-transition-new(timelineTextContent) {
}
</style>
