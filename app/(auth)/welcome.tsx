import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import { VStack } from '@/components/layout/Stacks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
	const router = useRouter();
	return (
		<ImageBackground
			source={{
				uri: 'https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1200',
			}}
			resizeMode='cover'
			className='flex-1'
		>
			<LinearGradient
				colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
				style={StyleSheet.absoluteFill} // This fills the parent completely
			>
				<SafeAreaView className='flex-1 justify-end p-6 pb-12'>
					<VStack className='gap-10'>
						<Animated.View entering={FadeIn.delay(300).duration(1000)}>
							<VStack gap='2'>
								<Text className='text-5xl text-white font-bold'>Itini</Text>
								<Text className='text-white'>Your group travel companion</Text>
							</VStack>
						</Animated.View>

						<Animated.View entering={FadeIn.delay(600).duration(1000)}>
							<VStack gap='4'>
								<Text className='text-white'>
									Plan trips, split bills, share photos, and chat with your
									travel group - all in one place.
								</Text>
								<Button onPress={() => router.push('/(auth)/signup')} size='lg'>
									Get started
								</Button>
								<Button
									onPress={() => router.push('/(auth)/login')}
									variant='outline'
								>
									I already have an account
								</Button>
							</VStack>
						</Animated.View>
					</VStack>
				</SafeAreaView>
			</LinearGradient>
		</ImageBackground>
	);
}
