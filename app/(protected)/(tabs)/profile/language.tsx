import {
	RadioGroup,
	RadioGroupItemWithLabel,
} from '@/components/ui/radio-group';
import { useLanguage } from '@/hooks/useLanguage';
import { View } from 'react-native';

const LANGUAGE_LABELS: { [key: string]: string } = {
	en: 'English',
};

export default function LanguageScreen() {
	const { language, availableLanguages, setLanguage } = useLanguage();

	return (
		<View className='p-6 pt-12'>
			<RadioGroup
				value={language}
				onValueChange={(value) => setLanguage(value)}
			>
				{availableLanguages.map((lang) => (
					<RadioGroupItemWithLabel
						key={lang}
						value={lang}
						label={LANGUAGE_LABELS[lang] ?? lang}
						onLabelPress={() => setLanguage(lang)}
					/>
				))}
			</RadioGroup>
		</View>
	);
}
