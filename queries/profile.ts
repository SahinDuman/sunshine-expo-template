import { useAuth } from '@/context/AuthContext';
import { Tables } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useProfileMutation = () => {
	const queryClient = useQueryClient();
	const { session } = useAuth();
	const userId = session?.user.id ?? '';

	return useMutation({
		mutationFn: async (updates: Partial<Tables<'profile'>>) => {
			const { error } = await supabase
				.from('profile')
				.update(updates)
				.eq('id', userId);
			if (error) throw error;
			return updates;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
};
