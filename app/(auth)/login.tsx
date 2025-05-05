import { AuthCard } from '@/components/auth/AuthCard';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
	return (
		<SafeAreaView className='flex-1 justify-center p-6'>
			<AuthCard title='Login'>
				<Text>Reee</Text>
			</AuthCard>
		</SafeAreaView>
	);
}
