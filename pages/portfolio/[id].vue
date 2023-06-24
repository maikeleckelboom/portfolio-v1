<script lang="ts" setup>
const route = useRoute()

const { params } = route
</script>

<template>
  <div>
    {{ params.id }}
  </div>
</template>

<style lang="postcss"></style>
