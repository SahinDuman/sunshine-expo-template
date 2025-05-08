import { AuthCard } from '@/components/auth/AuthCard';
import { FormInput } from '@/components/form/FormInput';
import { VStack } from '@/components/layout/Stacks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { SignupSchema, signupSchema } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
	const { t } = useTranslation('auth', { keyPrefix: 'signup' });
	const [loading, setLoading] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	async function signUpWithEmail(data: SignupSchema) {
		setLoading(true);
		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.signUp({
				email: data.email,
				password: data.password,
				options: { data: { display_name: data.name } },
			});

			if (error) {
				Alert.alert(error.message);
				return;
			}
			if (!session) {
				Alert.alert('Please check your inbox for email verification!');
				return;
			}
		} catch (error) {
			Alert.alert('An unexpected error occurred');
			return;
		} finally {
			setLoading(false);
		}
	}

	return (
		<SafeAreaView className='flex-1 justify-center p-6'>
			<AuthCard title={t('title')} description={t('description')}>
				<VStack className='gap-8'>
					<VStack className='gap-3'>
						<FormInput
							control={control}
							name='name'
							label={t('fields.name')}
							placeholder={t('fields.name')}
							error={errors.name}
						/>
						<FormInput
							control={control}
							name='email'
							label={t('fields.email')}
							placeholder={t('fields.email')}
							error={errors.email}
							inputMode='email'
						/>
						<FormInput
							control={control}
							name='password'
							label={t('fields.password')}
							placeholder={t('fields.password')}
							error={errors.password}
							secureTextEntry
						/>
					</VStack>
					<VStack className='gap-3'>
						<Button onPress={handleSubmit(signUpWithEmail)} disabled={loading}>
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
