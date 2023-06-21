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
  type: '',
  dateStart: '',
  dateEnd: '',
  roleName: '',
  roleDescriptionLabel: '',
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
          <label class="mb-2" for="role">Functienaam</label>
          <input id="role" v-model="formModel.roleName" type="text" />
        </fieldset>
        <fieldset>
          <label class="mb-2" for="type"> Type </label>
          <select id="type" v-model="formModel.type">
            <option value="internship">Stage</option>
            <option value="job">Werk</option>
          </select>
        </fieldset>
        <fieldset>
          <label class="mb-2" for="role-description-label">
            Functieomschrijving label
          </label>
          <input
            id="role-description-label"
            v-model="formModel.roleDescriptionLabel"
            type="text"
          />
        </fieldset>
        <fieldset>
          <label class="mb-2" for="role-about"> Functieomschrijving </label>
          <textarea
            id="role-about"
            v-model="formModel.roleDescription"
            type="text"
          />
        </fieldset>
        <fieldset>
          <fieldset class="grid-cols-2">
            <div class="grid gap-2">
              <label class="mb-2" for="start-date">Startdatum</label>
              <input
                id="start-date"
                v-model="formModel.dateStart"
                type="date"
              />
            </div>
            <div class="grid gap-2">
              <label class="mb-2" for="end-date"> Einddatum </label>
              <input id="end-date" v-model="formModel.dateEnd" type="date" />
            </div>
          </fieldset>
          <label class="mb-2" for="company"> Bedrijfsnaam </label>
          <input id="company" v-model="formModel.companyName" type="text" />
        </fieldset>
        <fieldset>
          <label class="mb-2" for="about"> Bedrijfsomschrijving </label>
          <input
            id="about"
            v-model="formModel.companyDescription"
            type="text"
          />
        </fieldset>
        <fieldset class="grid-cols-2">
          <div class="grid gap-2">
            <label class="mb-2" for="location"> Bedrijfslocatie </label>
            <input
              id="location"
              v-model="formModel.companyLocation"
              type="text"
            />
          </div>
          <div class="grid gap-2">
            <label class="mb-2" for="website"> Bedrijfswebsite </label>
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
