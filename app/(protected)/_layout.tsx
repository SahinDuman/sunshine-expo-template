import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function ProtectedLayout() {
	const { isReady, session } = useAuth();

	if (!isReady) {
		return null;
	}

	if (!session) {
		return <Redirect href='/(auth)/welcome' />;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
