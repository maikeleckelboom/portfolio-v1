<script lang="ts" setup>
const { setTimeline } = useTimelineStore()

const { data: timeline } = await useAsyncData(
  'timeline',
  async () =>
    await $fetch('/api/timeline', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: (response) =>
      response.data.map((item) => ({
        ...item,
        dates: getDates(item)
      }))
  }
)

setTimeline(timeline.value)

const {
  Placeholder: MenuPlaceholder,
  toggle,
  hide
} = useMenu(
  {
    trailingIcons: [
      {
        icon: 'ic:round-dark-mode',
        label: 'Dark mode',
        name: 'dark-mode',
        onClick: () => console.log('dark mode')
      }
    ]
  },
  {
    emits: {
      onClose: () => setTimeout(hide, 100)
    }
  }
)
</script>

<template>
  <div class="flex h-16 w-full items-start justify-start bg-surface">
    <div
      class="mx-auto flex h-full w-full max-w-5xl items-center justify-between p-4"
    >
      <Breadcrumbs />
      <MenuTrigger @click="toggle" />
    </div>
  </div>
  <PageContainer>
    <div class="flex w-full max-w-5xl justify-end px-1">
      <MenuPlaceholder />
    </div>
    <div class="mt-6 grid gap-8 px-4 md:grid-cols-[1fr,420px]">
      <div class="flex flex-col" id="profile-card">
        <ProfileHeroCard />
      </div>
      <div class="relative flex flex-col">
        <Timeline :timeline="timeline">
          <template #title> Werkervaring</template>
          <template #item="{ item, index }">
            <TimelineItem
              :index="index"
              :item="item"
              :to="`/timeline/${item.slug}`"
            />
          </template>
        </Timeline>
      </div>
    </div>
  </PageContainer>
</template>

<style>
@keyframes fade-out-to-left {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes fade-in-from-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

#profile-card {
  view-transition-name: profile-card;
}

::view-transition-old(profile-card):only-child {
  animation-name: fade-out-to-left;
}

::view-transition-new(profile-card):only-child {
  animation-name: fade-in-from-left;
}
</style>

<style scoped>
html:not(.is-transitioning) {
  img.selected {
    view-transition-name: selected-img;
  }
}
</style>
