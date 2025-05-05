import * as React from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';
import { Text } from './text';

const InputBase = React.forwardRef<
	React.ElementRef<typeof TextInput>,
	TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
	const isDisabled = props.editable === false;
	const isReadOnly = props.readOnly === true;

	return (
		<TextInput
			ref={ref}
			className={cn(
				'web:flex p-3 web:w-full rounded-md border border-input bg-transparent px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
				(isDisabled || isReadOnly) &&
					'opacity-50 web:cursor-not-allowed bg-muted',
				className
			)}
			placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
			{...props}
		/>
	);
});
InputBase.displayName = 'InputBase';

type PrependAppendType = React.ReactNode | string;

function InputAddon({ content }: { content: PrependAppendType }) {
	if (typeof content === 'string') {
		return (
			<Text className='text-muted-foreground flex-shrink-0 px-2 text-base lg:text-sm native:text-lg'>
				{content}
			</Text>
		);
	}
	return content;
}

export interface InputProps extends TextInputProps {
	prepend?: PrependAppendType;
	append?: PrependAppendType;
	containerClassName?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof InputBase>, InputProps>(
	({ prepend, append, className, containerClassName, ...props }, ref) => {
		return (
			<View
				className={cn(
					'flex flex-row items-center rounded-md border border-input overflow-hidden flex-grow',
					containerClassName
				)}
			>
				{prepend && (
					<View className='flex-row items-center ml-2'>
						<InputAddon content={prepend} />
					</View>
				)}

				<InputBase
					ref={ref}
					className={cn(
						'flex-1 border-0',
						prepend && 'pl-0',
						append && 'pr-0',
						className
					)}
					{...props}
				/>

				{append && (
					<View className='flex-row items-center mr-2'>
						<InputAddon content={append} />
					</View>
				)}
			</View>
		);
	}
);

Input.displayName = 'Input';

export { Input, InputBase };
