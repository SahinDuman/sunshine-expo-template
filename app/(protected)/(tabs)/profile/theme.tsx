import {
	RadioGroup,
	RadioGroupItemWithLabel,
} from '@/components/ui/radio-group';
import { useColorScheme } from '@/lib/useColorScheme';
import { View } from 'react-native';

export default function ThemeScreen() {
	const { setColorScheme, colorScheme } = useColorScheme();
	return (
		<View className='p-6 pt-12'>
			<RadioGroup
				value={colorScheme}
				onValueChange={(value) => setColorScheme(value as 'light' | 'dark')}
			>
				<RadioGroupItemWithLabel
					value='light'
					label='Light'
					onLabelPress={() => setColorScheme('light')}
				/>
				<RadioGroupItemWithLabel
					value='dark'
					label='Dark'
					onLabelPress={() => setColorScheme('dark')}
				/>
			</RadioGroup>
		</View>
	);
}
