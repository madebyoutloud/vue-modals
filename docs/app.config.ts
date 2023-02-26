import packageJson from '../packages/vue-modals/package.json'

export default defineAppConfig({
  docus: {
    title: packageJson.name,
    description: packageJson.description,
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
    },
    footer: {},
  },
})
