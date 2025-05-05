import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect } from 'react';

type AuthContextType = {};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	useEffect(() => {
		// TODO: Update logic with real auth
		router.replace('/(auth)/welcome');
	}, [router]);

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
