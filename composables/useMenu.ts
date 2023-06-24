import { c2c } from 'vue-c2c'
import BaseMenu from '~/components/BaseMenu.vue'

export const useMenu = c2c(BaseMenu, {
  withPlaceholder: true
})
