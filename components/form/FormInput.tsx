import { cn } from '@/lib/utils';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { TextInput } from 'react-native';
import { VStack } from '../layout/Stacks';
import { Input, InputProps } from '../ui/input';
import { Label } from '../ui/label';
import { Text } from '../ui/text';
import { ErrorMessage, ErrorMessageProps } from './Error';

type FormFieldWrapperProps = ErrorMessageProps & {
	label?: string;
	id?: string;
	detail?: string | React.ReactNode;
	detailError?: boolean;
	children?: React.ReactNode;
};

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
	label,
	id,
	error,
	detail,
	detailError,
	children,
}) => {
	return (
		<VStack className='relative w-full gap-3'>
			{label && <Label htmlFor={id}>{label}</Label>}
			{children}
			{detail && (
				<Text
					className={cn(
						'text-xs font-medium leading-none text-right',
						detailError ? 'text-destructive' : 'text-muted-foreground'
					)}
				>
					{detail}
				</Text>
			)}
			{error && <ErrorMessage error={error} />}
		</VStack>
	);
};

type FormInputProps<TFieldValues extends FieldValues> = InputProps &
	FormFieldWrapperProps & {
		control: Control<TFieldValues>;
		name: FieldPath<TFieldValues>;
	};

export const FormInput = React.forwardRef<
	React.ElementRef<typeof TextInput>,
	FormInputProps<any>
>(
	(
		{
			label,
			id,
			children,
			error,
			control,
			name,
			detail,
			detailError,
			...inputProps
		},
		ref
	) => {
		return (
			<FormFieldWrapper
				label={label}
				error={error}
				id={id}
				detail={detail}
				detailError={detailError}
			>
				<Controller
					control={control}
					name={name}
					render={({ field }) => (
						<Input
							id={id}
							ref={ref}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							value={field.value}
							{...inputProps}
						/>
					)}
				/>
				{children}
			</FormFieldWrapper>
		);
	}
);
