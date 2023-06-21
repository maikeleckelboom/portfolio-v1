<script lang="ts" setup>
import { IExperience } from '~/types/experience'
import AppTextEditor from '~/components/AppTextEditor.vue'

definePageMeta({
  title: 'Create a new experience.',
  description: ''
})

const router = useRouter()

const errorMessage = ref<string>('')

const defaultContent = {
  type: 'doc',
  content: []
}

const formModel = reactive<IExperience>({
  type: 'internship',
  startDate: '',
  endDate: '',
  roleName: '',
  roleDesc: '',
  companyDesc: '',
  roleDescription: '',
  companyName: '',
  companyLocation: '',
  companyWebsite: '',
  companyDescription: ''
})

const onSubmit = async (ev) => {
  const { data, error } = await $fetch('/api/experiences', {
    method: 'POST',
    body: JSON.stringify(formModel),
    headers: useRequestHeaders(['cookie'])
  })

  errorMessage.value = error

  if (!data) {
    return
  }

  await router.push('/app/experiences')
}
</script>

<template>
  <div>
    <PageContainer>
      <div class="grid gap-4 p-4">
        <fieldset>
          <label for="role">Functienaam</label>
          <input id="role" v-model="formModel.roleName" type="text" />
        </fieldset>
        <fieldset>
          <label for="type"> Type </label>
          <select id="type" v-model="formModel.type">
            <option value="internship">Stage</option>
            <option value="job">Werk</option>
          </select>
        </fieldset>
        <fieldset>
          <label for="role-about"> Functieomschrijving </label>
          <AppTextEditor v-model="formModel.roleDesc" :max-limit="200" />
        </fieldset>
        <fieldset>
          <fieldset class="grid-cols-2">
            <div class="grid gap-2">
              <label for="start-date">Startdatum</label>
              <input
                id="start-date"
                v-model="formModel.startDate"
                type="date"
              />
            </div>
            <div class="grid gap-2">
              <label for="end-date"> Einddatum </label>
              <input id="end-date" v-model="formModel.endDate" type="date" />
            </div>
          </fieldset>
          <label for="company"> Bedrijfsnaam </label>
          <input id="company" v-model="formModel.companyName" type="text" />
        </fieldset>
        <fieldset>
          <label for="about"> Bedrijfsomschrijving </label>
          <input id="about" v-model="formModel.companyDesc" type="text" />
        </fieldset>
        <fieldset class="grid-cols-2">
          <div class="grid gap-2">
            <label for="location"> Bedrijfslocatie </label>
            <input
              id="location"
              v-model="formModel.companyLocation"
              type="text"
            />
          </div>
          <div class="grid gap-2">
            <label for="website"> Bedrijfswebsite </label>
            <input
              id="website"
              v-model="formModel.companyWebsite"
              type="text"
            />
          </div>
        </fieldset>
        <BaseButton type="submit" @click.prevent="onSubmit">Submit</BaseButton>
      </div>
    </PageContainer>
  </div>
</template>

<style lang="postcss"></style>

<style lang="postcss" scoped>
fieldset {
  @apply grid;

  + label {
    @apply mb-2 mt-4;
  }
}
</style>
