import { AuthCard } from '@/components/auth/AuthCard';
import { FormInput } from '@/components/form/FormInput';
import { VStack } from '@/components/layout/Stacks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { loginSchema, LoginSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
	const { t } = useTranslation('auth', { keyPrefix: 'login' });
	const [loading, setLoading] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	});

	const signInWithEmail = async (data: LoginSchema) => {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password,
			});

			if (error) {
				Alert.alert(error.message);
			}
		} catch (error) {
			Alert.alert('An unexpected error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView className='flex-1 justify-center p-6'>
			<AuthCard title={t('title')} description={t('description')}>
				<VStack className='gap-8'>
					<VStack className='gap-3'>
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
						<Button onPress={handleSubmit(signInWithEmail)} disabled={loading}>
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
