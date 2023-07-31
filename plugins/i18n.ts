// import { createI18n } from 'vue-i18n'
import en from '~/locales/en.json'
import fr from '~/locales/fr.json'

export default defineNuxtPlugin(({ vueApp }) => {
  console.log('vueApp', vueApp)
  // console.log('createI18N', createI18n)
//   const i18n = createI18n({
//     legacy: false,
//     globalInjection: true,
//     locale: 'fr',
//     messages: {
//       en,
//       fr
//     }
//   })

//   vueApp.use(i18n)
})
