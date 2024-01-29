import type { UserConfig } from 'unocss'
import { defineConfig, presetWind, transformerDirectives } from 'unocss'

export const config: UserConfig = {
  content: {
    filesystem: [
      'content/**/*.md',
    ],
  },
  presets: [
    presetWind({}),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      primary: '#ef3825',
    },
  },
}

export default defineConfig(config)
