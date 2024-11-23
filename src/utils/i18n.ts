import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import { store } from '../app/store'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: store.getState().auth.language.toLowerCase() || 'sr',
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['general', 'user', 'login'],
    defaultNS: 'general',
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    store.subscribe(() => {
      const newLanguage = store.getState().auth.language.toLowerCase()
      if (newLanguage !== i18n.language) {
        i18n.changeLanguage(newLanguage)
      }
    })
  })

export default i18n
