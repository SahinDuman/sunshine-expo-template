import { AuthCard } from '@/components/auth/AuthCard';
import { VStack } from '@/components/layout/Stacks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
	const { t } = useTranslation('auth', { keyPrefix: 'signup' });
	const [name, setName] = useState('');
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
			options: {
				data: {
					display_name: name,
				},
			},
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

		setLoading(false);
	}

	return (
		<SafeAreaView className='flex-1 justify-center p-6'>
			<AuthCard title={t('title')} description={t('description')}>
				<VStack className='gap-8'>
					<VStack className='gap-3'>
						<Input
							placeholder={t('fields.name')}
							inputMode='text'
							onChangeText={setName}
						/>
						<Input
							placeholder={t('fields.email')}
							inputMode='email'
							onChangeText={setEmail}
						/>
						<Input
							placeholder={t('fields.password')}
							secureTextEntry
							onChangeText={setPassword}
						/>
					</VStack>
					<VStack className='gap-3'>
						<Button onPress={signUpWithEmail} disabled={loading}>
							{t('ctas.signup')}
						</Button>
						<Text className='text-center'>
							<Trans
								t={t}
								i18nKey='already_registered'
								components={{
									Link: (
										<Link
											className='underline'
											href={'/(auth)/login'}
											replace
										/>
									),
								}}
							/>
						</Text>
					</VStack>
				</VStack>
			</AuthCard>
		</SafeAreaView>
	);
}
