import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'sr',
  debug: false,
  resources: {
    en: {
      translation: {
        key: 'hello world',
      },
    },
    sr: {
      translation: {
        key: 'zdravo svete',
      },
    },
  },
})

export default i18n
