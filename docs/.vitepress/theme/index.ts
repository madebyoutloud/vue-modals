// @ts-expect-error missing types
import { SANDBOX_TEMPLATES } from 'sandpack-vue3'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { Sandbox } from 'vitepress-plugin-sandpack'
import 'vitepress-plugin-sandpack/dist/style.css'
import './style.css'
import packageJson from '../../../packages/vue-modals/package.json'
import nuxtJson from '../../../packages/nuxt/package.json'
import Layout from './Layout.vue'
import { template } from './template'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.config.globalProperties.$packageJson = packageJson
    app.config.globalProperties.$nuxtJson = nuxtJson

    app.component('Sandbox', Sandbox)

    Object.assign(SANDBOX_TEMPLATES['vite-vue-ts'], template)
  },
  Layout,
}

export default theme
