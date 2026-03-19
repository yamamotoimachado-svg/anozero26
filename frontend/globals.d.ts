// Use type safe message keys with `next-intl`
type Messages = typeof import('./i18n/pt.json');
declare interface IntlMessages extends Messages {}