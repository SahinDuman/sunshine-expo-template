import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';

export default function ProfileScreen() {
	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			Alert.alert('Logout Error', error.message);
		}
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<IconSymbol
					size={310}
					color='#808080'
					name='chevron.left.forwardslash.chevron.right'
				/>
			}
		>
			<ThemedView>
				<ThemedText type='title'>Profile</ThemedText>
				<Button onPress={handleLogout}>Logout</Button>
			</ThemedView>
		</ParallaxScrollView>
	);
}
