<script lang="ts" setup>
const selected = useState()
</script>

<template>
  <div class="flex">
    <ProfileHeroText>
      <template #title> Maikel Eckelboom</template>
      <template #subtitle>
        Full-stack developer met een passie voor ontwerp en technologie.
      </template>
      <template #button>
        <div class="inline-flex items-center gap-2">
          <DarkToggleButton />
          <BaseButton> mijn werk</BaseButton>
          <BaseButton> maak contact</BaseButton>
        </div>
      </template>
    </ProfileHeroText>
  </div>
</template>

<style lang="postcss"></style>
