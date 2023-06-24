<script lang="ts" setup>
const selected = useState()
</script>

<template>
  <div class="flex px-4 py-6">
    <ProfileHeroText>
      <template #title> Maikel Eckelboom</template>
      <template #subtitle>
        Full-stack developer met een passie voor ontwerp en technologie.
      </template>
      <template #button>
        <div class="mt-4 inline-flex items-center gap-2">
          <DarkToggleButton />
          <BaseButton> Mijn werk</BaseButton>
          <BaseButton> Contact</BaseButton>
        </div>
      </template>
    </ProfileHeroText>
  </div>
</template>

<style lang="postcss"></style>
