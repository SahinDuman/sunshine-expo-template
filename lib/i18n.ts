import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../translations/en.json';

const resources = {
	en,
};

const FALLBACK_LANG = 'en';

const initI18n = async () => {
	// const savedLanguage =
	// 	(await SecureStore.getItemAsync('language')) || FALLBACK_LANG;
	const savedLanguage =
		(await AsyncStorage.getItem('language')) || FALLBACK_LANG;

	// eslint-disable-next-line import/no-named-as-default-member
	i18n.use(initReactI18next).init({
		resources,
		lng: savedLanguage,
		fallbackLng: 'en',
	});
};

initI18n();

export default i18n;
