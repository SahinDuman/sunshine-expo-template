import React from 'react';
import { Text } from '../ui/text';

interface Error {
	message?: string;
}
export type ErrorMessageProps = {
	error?: Error;
};

export function ErrorMessage({ error }: ErrorMessageProps) {
	if (!error?.message) return null;

	return <Text className='text-red-500 text-sm'>{error.message}</Text>;
}
