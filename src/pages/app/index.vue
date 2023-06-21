<script lang="ts" setup>
const content = ref<string>(
  `<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>`
)
</script>

<template>
  <PageContainer>
    <TipTapEditor v-model="content" />
    <div class="content">
      <pre><code>{{ content }}</code></pre>
    </div>
  </PageContainer>
</template>
