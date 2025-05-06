import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
	const { isReady, session } = useAuth();

	if (!isReady) {
		return null;
	}

	if (session) {
		return <Redirect href='/(protected)/(tabs)' />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_bottom',
				animationDuration: 300,
			}}
		/>
	);
}
