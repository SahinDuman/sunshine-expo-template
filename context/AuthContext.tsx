import { createContext, use, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

type AuthContextType = {
	session: Session | null;
	isReady: boolean;
};

const AuthContext = createContext<AuthContextType>({
	session: null,
	isReady: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setIsReady(true);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		if (isReady) {
			SplashScreen.hideAsync();
		}
	}, [isReady]);

	return <AuthContext value={{ session, isReady }}>{children}</AuthContext>;
}

export const useAuth = () => {
	const context = use(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
