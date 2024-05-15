import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'
import packageJson from '../../../packages/vue-modals/package.json'
import nuxtJson from '../../../packages/nuxt/package.json'
import Layout from './Layout.vue'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.config.globalProperties.$packageJson = packageJson
    app.config.globalProperties.$nuxtJson = nuxtJson
  },
  Layout,
}

export default theme
