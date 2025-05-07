import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Alert } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const useUserProfile = () => {
	const { session } = useAuth();
	const userId = session?.user.id;

	return useQuery({
		queryKey: ['profile', session],
		queryFn: async () => {
			if (!userId) return null;
			const { data, error } = await supabase
				.from('profile')
				.select('display_name, avatar_url, email')
				.eq('id', userId)
				.single();
			if (error) throw error;
			return data;
		},
		enabled: Boolean(userId),
	});
};

export default function ProfileScreen() {
	const { data: profile } = useUserProfile();

	const name = profile?.display_name ?? profile?.email?.split('@')[0];

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
				<ThemedText type='title'>{name}</ThemedText>
				<Button onPress={handleLogout}>Logout</Button>
			</ThemedView>
		</ParallaxScrollView>
	);
}
