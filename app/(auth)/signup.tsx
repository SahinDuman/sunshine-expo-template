import { AuthCard } from '@/components/auth/AuthCard';
import { VStack } from '@/components/layout/Stacks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	async function signUpWithEmail() {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			Alert.alert(error.message);
			setLoading(false);
			return;
		}
		if (!session) {
			Alert.alert('Please check your inbox for email verification!');
			setLoading(false);
			return;
		}

		if (session.user) {
			router.push('/(auth)/welcome');
		}
		setLoading(false);
	}

	return (
		<SafeAreaView className='flex-1 justify-center p-6'>
			<AuthCard
				title='Signup'
				description='Let’s get started. Fill in the details below to create your account.'
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
					<Button onPress={signUpWithEmail} disabled={loading}>
						Sign up
					</Button>
				</VStack>
			</AuthCard>
		</SafeAreaView>
	);
}
