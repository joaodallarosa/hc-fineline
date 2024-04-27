export default {
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/robots",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/content"
  ],
  i18n: {
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts'
  },
  nitro: {
    preset: "vercel-edge",
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    compilerOptions: {
      types: ["node", "webpack-env"],
    },
  },
  css: ["@/assets/css/tailwind.css", "vue-final-modal/style.css"],
  head: {
    title: "Helena de Carvalho | Fineline Tattoo",
  },
};