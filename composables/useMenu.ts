import { c2c } from 'vue-c2c'
import Menu from '~/components/Menu/Menu.vue'

export const useMenu = c2c(Menu, {
  withPlaceholder: true
})
