import { VStack } from '@/components/layout/Stacks';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserProfile } from '@/queries/profile';
import { ActivityIndicator, View } from 'react-native';

export default function EditProfileScreen() {
	const { data: profile, isLoading } = useUserProfile();

	if (isLoading) {
		return <ActivityIndicator />;
	}

	return (
		<View className='flex-1 p-6 pb-32'>
			<VStack className='mt-6 gap-8'>
				<ProfileAvatar
					className='w-24 h-24 self-center'
					url={profile?.avatar_url}
					displayName={profile?.display_name}
				/>

				<Input value={profile?.display_name ?? ''} placeholder='Name' />
				<Input value={profile?.email ?? ''} placeholder='Email' readOnly />
			</VStack>
			<Button className='mt-auto'>Save</Button>
		</View>
	);
}
