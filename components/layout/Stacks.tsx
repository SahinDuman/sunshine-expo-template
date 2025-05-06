import { cn } from '@/lib/utils';
import React from 'react';
import { View } from 'react-native';

type Size =
	| '0'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10'
	| '11'
	| '12';

type StackProps = React.ComponentProps<typeof View>;

export const VStack = React.forwardRef<
	React.ComponentRef<typeof View>,
	StackProps
>(function VStack({ className, ...props }, ref) {
	return (
		<View className={cn('flex flex-col', className)} {...props} ref={ref} />
	);
});

export const HStack = React.forwardRef<
	React.ComponentRef<typeof View>,
	StackProps
>(function HStack({ className, ...props }, ref) {
	return (
		<View className={cn('flex flex-row', className)} {...props} ref={ref} />
	);
});

type SpacerProps = React.ComponentProps<typeof View> & {
	size: Size;
	direction?: 'horizontal' | 'vertical';
};

export const Spacer = React.forwardRef<
	React.ComponentRef<typeof View>,
	SpacerProps
>(function Spacer(
	{ className, size = 0, direction = 'vertical', ...props },
	ref
) {
	const directionSize = direction === 'vertical' ? `h-${size}` : `w-${size}`;

	return (
		<View
			className={cn('flex-1', directionSize, className)}
			{...props}
			ref={ref}
		/>
	);
});
