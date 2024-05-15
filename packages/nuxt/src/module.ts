import { addImports, addPlugin, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name } from '../package.json'

export default defineNuxtModule({
  meta: {
    name,
    configKey: 'modals',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const packageName = '@outloud/vue-modals'

    // Transpile runtime
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    // https://github.com/nuxt/framework/pull/8544
    nuxt.options.vite.optimizeDeps ||= {}
    nuxt.options.vite.optimizeDeps.include ||= []
    nuxt.options.vite.optimizeDeps.include.push(packageName)

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: name })
    })

    addTemplate({
      filename: 'modals-options.mjs',
      getContents() {
        return `export const modalsOptions = ${JSON.stringify(options, null, 2)}`
      },
    })

    // Add runtime plugin before the router plugin
    // https://github.com/nuxt/framework/issues/9130
    nuxt.hook('modules:done', () => {
      addPlugin(resolver.resolve('./runtime/plugin'))
    })

    nuxt.options.css.push(`${packageName}/style.css`)

    const composables = ['useModals', 'useModal', '$useModal']
    composables.map((composable) => addImports({
      name: composable,
      from: packageName,
    }))
  },
})
