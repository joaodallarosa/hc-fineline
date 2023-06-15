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
  css: ["@/src/css/tailwind.css"],
};
