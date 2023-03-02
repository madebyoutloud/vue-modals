import { addImports, addPlugin, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@outloud/nuxt-modals',
    configKey: 'modals',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Transpile runtime
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))
    // nuxt has issue with resolving esm/cjs modules
    nuxt.options.build.transpile.push('@outloud/vue-modals')

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: '@outloud/nuxt-modals' })
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

    nuxt.options.css.push('@outloud/vue-modals/style.css')

    const composables = ['useModals', 'useModal']
    composables.map(name => addImports({
      name,
      from: '@outloud/vue-modals',
    }))
  },
})
