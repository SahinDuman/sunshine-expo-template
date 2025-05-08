import { FormInput } from '@/components/form/FormInput';
import { VStack } from '@/components/layout/Stacks';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { Button } from '@/components/ui/button';
import { useProfileMutation, useUserProfile } from '@/queries/profile';
import { profileSchema } from '@/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';

export default function EditProfileScreen() {
	const { t } = useTranslation('profile', {
		keyPrefix: 'edit_profile_settings',
	});
	const { data: profile, isLoading } = useUserProfile();
	const { mutateAsync, isPending: isUpdating } = useProfileMutation();

	const {
		handleSubmit: handleFormSubmit,
		formState: { errors, isDirty },
		control,
	} = useForm({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			display_name: profile?.display_name ?? '',
			email: profile?.email ?? '',
		},
	});

	if (isLoading) {
		return <ActivityIndicator />;
	}

	const handleSubmit = handleFormSubmit((data) => {
		mutateAsync(data);
	});

	return (
		<View className='flex-1 p-6 pb-32'>
			<VStack className='mt-6 gap-8'>
				<ProfileAvatar
					className='w-24 h-24 self-center'
					url={profile?.avatar_url}
					displayName={profile?.display_name}
				/>
				<FormInput
					control={control}
					name='display_name'
					placeholder={t('fields.name')}
					label={t('fields.name')}
					error={errors.display_name}
				/>
				<FormInput
					control={control}
					name='email'
					placeholder={t('fields.email')}
					label={t('fields.email')}
					readOnly
				/>
			</VStack>
			<Button
				className='mt-auto'
				onPress={handleSubmit}
				disabled={!isDirty || isUpdating}
			>
				{t('ctas.save')}
			</Button>
		</View>
	);
}
