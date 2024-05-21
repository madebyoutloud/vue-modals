import { type HeadConfig, defineConfig } from 'vitepress'
import container from 'markdown-it-container'
import { renderSandbox } from 'vitepress-plugin-sandpack'
import packageJson from '../../packages/vue-modals/package.json'

const webUrl = process.env.WEB_URL ?? ''

const meta = [
  {
    name: 'robots',
    content: 'index, follow',
  },
  {
    itemprop: 'image',
    content: 'website',
  },
  {
    property: 'og:type',
    content: 'website',
  },
  {
    property: 'og:image',
    content: webUrl + '/images/social.png',
  },
  {
    property: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    property: 'twitter:image',
    content: webUrl + '/images/social.png',
  },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: packageJson.title,
  description: packageJson.description,

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    config(md) {
      md.use(container, 'sandbox', {
        render: (tokens, idx) => renderSandbox(tokens, idx, 'sandbox'),
      })
    },
  },

  head: [
    [
      'link', {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: '32x32',
      },
    ],
    [
      'link', {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    ...meta.map((item) => ['meta', item] as HeadConfig),
  ],

  themeConfig: {
    logo: '/logo.svg',

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Docs',
        link: '/docs/getting-started',
        activeMatch: '/docs/',
      },
      {
        text: 'Outloud',
        link: 'https://outloud.co',
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          {
            text: 'Getting Started',
            link: '/docs/getting-started',
          }, {
            text: 'Nuxt',
            link: '/docs/nuxt',
          }, {
            text: 'Configuration',
            link: '/docs/configuration',
          }, {
            text: 'Usage',
            link: '/docs/usage',
          },
        ],
      },
      {
        text: 'Guide',
        items: [
          {
            text: 'Examples',
            link: '/docs/guide/examples',
          },
          {
            text: 'Extending API',
            link: '/docs/guide/extend',
          },
          {
            text: 'Styling',
            link: '/docs/guide/styling',
          },
        ],
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Modals Container',
            link: '/docs/components/modals-container',
          },
        ],
      },
      {
        text: 'Composables',
        items: [
          {
            text: 'useModal',
            link: '/docs/composables/use-modal',
          }, {
            text: 'useModals',
            link: '/docs/composables/use-modals',
          },
        ],
      },
      {
        text: 'API',
        items: [
          {
            text: 'Modal Manager',
            link: '/docs/api/modal-manager',
          },
          {
            text: 'Modal',
            link: '/docs/api/modal',
          },
        ],
      },
    ],

    footer: {
      copyright: 'Copyright © 2024-present Outloud',
    },

    socialLinks: [
      {
        icon: 'github',
        link: packageJson.repository.url,
      },
    ],
  },
})
