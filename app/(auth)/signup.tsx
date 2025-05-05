import { AuthCard } from '@/components/auth/AuthCard';
import { VStack } from '@/components/layout/Stacks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
	const router = useRouter();
	return (
		<SafeAreaView className='flex-1 justify-center p-6'>
			<AuthCard
				title='Signup'
				description='Let’s get started. Fill in the details below to create your account.'
			>
				<VStack gap='3'>
					<Input placeholder='Email' inputMode='email' />
					<Input placeholder='Password' secureTextEntry />
					<Button onPress={() => router.push('/(tabs)')}>Sign up</Button>
				</VStack>
			</AuthCard>
		</SafeAreaView>
	);
}
