export default {
  modules: ["@nuxtjs/tailwindcss"],
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
    title: "HC Fineline Tattoo",
  },
};
