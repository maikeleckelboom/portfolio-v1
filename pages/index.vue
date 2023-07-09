<script lang="ts" setup>
import TimelineMobile from '~/components/TimelineMobile.vue'

const store = useTimelineStore()
const { timeline } = storeToRefs(store)

if (!timeline.value) {
  const { data } = await useAsyncData(
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

  store.setTimeline(data.value)
}

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

const device = useDevice()
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
        <TimelineMobile :timeline="timeline" v-if="device.isMobileOrTablet" />
        <TimelineDesktop :timeline="timeline" v-else />
      </div>
    </div>
  </PageContainer>
</template>

<style>
@import 'assets/css/keyframes.css';

html:not(:is(.prevent-pan-x, .is-transitioning)) {
  #profile-card {
    view-transition-name: profile-card;
  }
}

::view-transition-old(profile-card):only-child {
  animation-name: fade-out-to-left;
}

::view-transition-new(profile-card):only-child {
  animation-name: fade-in-from-left;
}
</style>
