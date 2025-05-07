import i18n from '@/lib/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLanguage = () => {
	const language = i18n.language;
	const availableLanguages = i18n.languages;

	const setLanguage = async (language: string) => {
		try {
			await AsyncStorage.setItem('language', language);
			i18n.changeLanguage(language);
		} catch (error) {
			console.log(error);
		}
	};

	return { language, setLanguage, availableLanguages };
};
