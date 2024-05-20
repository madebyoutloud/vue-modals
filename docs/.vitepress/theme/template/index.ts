// @ts-expect-error plain import
import App from './App.vue?raw'
// @ts-expect-error plain import
import Modal from './Modal.vue?raw'
// @ts-expect-error plain import
import index from './index.html?raw'
// @ts-expect-error plain import
import main from './main.ts.template?raw'
// @ts-expect-error plain import
import plugin from './plugin.ts.template?raw'
// @ts-expect-error plain import
import viteConfig from './vite.config.ts.template?raw'
// @ts-expect-error plain import
import unoConfig from './uno.config.ts.template?raw'
// @ts-expect-error plain import
import style from './style.css?raw'

export const template = {
  files: {
    '/src/styles.css': style,
    '/src/App.vue': {
      code: App,
    },
    'src/Modal.vue': {
      code: Modal,
      hidden: false,
      active: true,
    },
    '/src/main.ts': {
      code: main,
    },
    '/src/plugin.ts': {
      code: plugin,
    },
    '/index.html': {
      code: index,
    },
    '/vite-env.d.ts': {
      code: '/// <reference types="vite/client" />',
    },
    '/vite.config.ts': {
      code: viteConfig,
    },
    '/uno.config.ts': {
      code: unoConfig,
    },
    '/package.json': {
      code: JSON.stringify({
        type: 'module',
        main: '/src/main.ts',
        scripts: {
          dev: 'vite',
          build: 'tsc && vite build',
          preview: 'vite preview',
        },
        dependencies: {
          '@outloud/vue-modals': '^2.0.0',
          'vue': '^3.4',
          '@vueuse/core': '^10.9.0',
          'tua-body-scroll-lock': '^1.5.0',
        },
        devDependencies: {
          '@vitejs/plugin-vue': '^4.2.3',
          'vite': '^4.2.2',
          'vue-tsc': '^1.6.5',
          'typescript': '^5.0.4',
          'esbuild-wasm': '^0.21.3',
          // '@unocss/reset': '^0.60.2',
        },
      }, null, 2),
    },
    'tsconfig.json': {
      code: JSON.stringify({
        compilerOptions: {
          target: 'ESNext',
          useDefineForClassFields: true,
          module: 'ESNext',
          moduleResolution: 'Node',
          strict: true,
          jsx: 'preserve',
          resolveJsonModule: true,
          isolatedModules: true,
          esModuleInterop: true,
          lib: ['ESNext', 'DOM'],
          skipLibCheck: true,
          noEmit: true,
        },
        include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        references: [{ path: './tsconfig.node.json' }],
      }, null, 2),
    },
    'tsconfig.node.json': {
      code: JSON.stringify({
        compilerOptions: {
          composite: true,
          module: 'ESNext',
          moduleResolution: 'Node',
          allowSyntheticDefaultImports: true,
        },
        include: ['vite.config.ts'],
      }, null, 2),
    },
  },
}
