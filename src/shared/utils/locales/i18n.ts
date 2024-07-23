import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../../../public/locales/en/translation.json'
import ru from '../../../../public/locales/ru/translation.json'
// import HttpBackend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
export const defaultNS = 'translation'

i18n
  // .use(HttpBackend)
  // .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: en
      },
      ru: {
        translation: ru
      }
    },
    debug: true,
    lng: 'ru', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
