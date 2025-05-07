import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Text } from '../ui/text';

type ProfileAvatarProps = {
	url?: string | null;
	fallBackText: string;
	className?: string;
};

export function ProfileAvatar({
	url,
	fallBackText,
	className,
}: ProfileAvatarProps) {
	return (
		<Avatar alt={`${fallBackText} avatar`} className={className}>
			<AvatarImage src={url ?? ''} />
			<AvatarFallback className='bg-secondary'>
				<Text>{fallBackText}</Text>
			</AvatarFallback>
		</Avatar>
	);
}
