import { Alert, FlatList, Pressable, View } from 'react-native';

import { HStack, VStack } from '@/components/layout/Stacks';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { useUserProfile } from '@/queries/profile';
import { useRouter } from 'expo-router';
import { JSX } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProfileItemProps = {
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	children?: JSX.Element;
	onPress?: () => void;
	className?: string;
};

function ProfileItem({
	children,
	onPress,
	leftIcon,
	rightIcon = <IconSymbol name='arrow.right' color='#808080' size={24} />,
	className,
}: ProfileItemProps) {
	return (
		<Pressable
			onPress={onPress}
			className={cn(
				'p-4 rounded-md justify-between flex-row items-center',
				className
			)}
		>
			<HStack className='gap-4 items-center'>
				{leftIcon}
				{children}
			</HStack>
			{rightIcon}
		</Pressable>
	);
}

export default function ProfileScreen() {
	const router = useRouter();
	const { data: profile } = useUserProfile();
	const name = profile?.display_name ?? profile?.email?.split('@')[0];

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			Alert.alert('Logout Error', error.message);
		}
	};

	const data = [
		{
			leftIcon: <IconSymbol name='globe' color='#000' size={20} />,
			label: 'Language',
			onPress: () => {
				Alert.alert('Language', 'Not implemented yet');
			},
		},
		{
			leftIcon: <IconSymbol name='moon' color='#000' size={20} />,
			label: 'Theme',
			onPress: () => {
				router.push('/(protected)/(tabs)/profile/theme');
			},
		},
	];

	return (
		<SafeAreaView className='p-6 flex-1'>
			<FlatList
				className='flex-1'
				contentContainerClassName='flex-grow gap-2'
				ListHeaderComponent={
					<VStack className='gap-8 mb-12'>
						<Text className='text-4xl font-bold'>Profile</Text>
						<ProfileItem
							className='py-6 bg-muted'
							onPress={() => {
								router.push('/(protected)/(tabs)/profile/edit');
							}}
							leftIcon={
								<ProfileAvatar
									className='h-12 w-12 bg-muted-foreground'
									url={profile?.avatar_url}
									displayName={name ?? ''}
								/>
							}
						>
							<View>
								<Text className='text-lg font-bold'>{name}</Text>
								<Text className='text-muted-foreground text-sm'>
									Edit profile
								</Text>
							</View>
						</ProfileItem>
					</VStack>
				}
				data={data}
				renderItem={({ item }) => (
					<ProfileItem {...item}>
						<Text>{item.label}</Text>
					</ProfileItem>
				)}
				ListFooterComponent={<Button onPress={handleLogout}>Logout</Button>}
				ListFooterComponentClassName='mt-auto pt-6 mb-16'
			/>
		</SafeAreaView>
	);
}
