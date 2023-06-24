<script lang="ts" setup>
const authClient = useSupabaseAuthClient()
const onGithubLogin = async () => {
  try {
    const response = await authClient.auth.signInWithOAuth({
      provider: 'github'
    })
    console.log({ response })
  } catch (exc) {
    console.error(exc.message)
  }
}
</script>

<template>
  <PageContainer>
    <div class="flex h-d-screen w-full flex-col items-center justify-center">
      <div class="rounded-lg border p-8">
        <button
          class="flex items-center justify-center gap-2 rounded-full border bg-secondary-container px-4 py-2 text-on-secondary-container"
          @click="onGithubLogin"
        >
          <Icon name="logos:github-icon" />
          <span class="text-label-large"> Login with Github </span>
        </button>
      </div>
    </div>
  </PageContainer>
</template>
