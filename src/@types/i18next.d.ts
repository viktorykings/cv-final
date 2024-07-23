import { defaultNS } from '../shared/utils/locales/i18n'
import resources from './resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources
  }
}
