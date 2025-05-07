import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export const useUserProfile = () => {
	const { session } = useAuth();
	const userId = session?.user.id;

	return useQuery({
		queryKey: ['profile', session],
		queryFn: async () => {
			if (!userId) return null;
			const { data, error } = await supabase
				.from('profile')
				.select('display_name, avatar_url, email')
				.eq('id', userId)
				.single();
			if (error) throw error;
			return data;
		},
		enabled: Boolean(userId),
	});
};
