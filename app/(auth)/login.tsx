import { AuthCard } from '@/components/auth/AuthCard';
import { VStack } from '@/components/layout/Stacks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const signInWithEmail = async () => {
		setLoading(true);
		const { error, data } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			Alert.alert(error.message);
			setLoading(false);
			return;
		}

		if (data.session.user) {
			router.push('/(tabs)');
		}
		setLoading(false);
	};

	return (
		<SafeAreaView className='flex-1 justify-center p-6'>
			<AuthCard
				title='Login'
				description='Enter your registered account email and password.'
			>
				<VStack className='gap-3'>
					<Input
						placeholder='Email'
						inputMode='email'
						onChangeText={setEmail}
					/>
					<Input
						placeholder='Password'
						secureTextEntry
						onChangeText={setPassword}
					/>
					<Button onPress={signInWithEmail} disabled={loading}>
						Login
					</Button>
				</VStack>
			</AuthCard>
		</SafeAreaView>
	);
}
