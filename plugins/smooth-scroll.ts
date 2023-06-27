import VueSmoothScroll from "vue3-smooth-scroll";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSmoothScroll, {
    duration: 500, // animation duration in ms
    offset: -200, // offset in px from scroll element, can be positive or negative
  });
});
