import { VStack } from '../layout/Stacks';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';

type AuthCardProps = {
	title: string;
	description?: React.ReactNode;
	children: React.ReactNode;
};

export const AuthCard: React.FC<AuthCardProps> = ({
	title,
	description,
	children,
}) => {
	return (
		<Card className='bg-transparent border-0 shadow-none '>
			<VStack gap='6'>
				<CardHeader className='p-0 gap-3'>
					<CardTitle className='text-3xl font-display p-0'>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className='p-0'>{children}</CardContent>
			</VStack>
		</Card>
	);
};
