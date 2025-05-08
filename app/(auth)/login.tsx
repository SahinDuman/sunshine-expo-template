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

export default function LoginScreen() {
	const { t } = useTranslation('auth', { keyPrefix: 'login' });
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const signInWithEmail = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			Alert.alert(error.message);
			setLoading(false);
			return;
		}

		setLoading(false);
	};

	return (
		<SafeAreaView className='flex-1 justify-center p-6'>
			<AuthCard title={t('title')} description={t('description')}>
				<VStack className='gap-8'>
					<VStack className='gap-3'>
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
						<Button onPress={signInWithEmail} disabled={loading}>
							{t('ctas.login')}
						</Button>
						<Text className='text-center'>
							<Trans
								t={t}
								i18nKey='no_account'
								components={{
									Link: (
										<Link className='underline' href='/(auth)/signup' replace />
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
