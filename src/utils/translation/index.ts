import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export enum Languages {
  ARABIC = 'ar',
  ENGLISH = 'en',
}

i18n.locale = Languages.ARABIC;

export const translate = memoize(
  (key: any, config: any = {}) => i18n.t(key, config),
  (key: any, config: any) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = (translations: Record<Languages, Record<string, string>>, languageTag = Languages.ARABIC) => {
  i18n.translations = translations;
  i18n.locale = languageTag;
};

export const getCurrentLanguage = () => {
  return i18n.currentLocale() as Languages;
}

export const setCurrentLanguage = (language: Languages) => {
  return i18n.locale = language;
}
