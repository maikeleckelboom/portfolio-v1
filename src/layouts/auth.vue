<script lang="ts" setup>
const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const router = useRouter()

client.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' && !session && !user.value) {
    router.push('/')
  }
})
</script>

<template>
  <div class="min-d-screen grid w-full">
    <slot></slot>
  </div>
</template>
