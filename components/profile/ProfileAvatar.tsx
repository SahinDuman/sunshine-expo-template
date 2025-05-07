import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Text } from '../ui/text';

type ProfileAvatarProps = {
	url?: string | null;
	displayName?: string | null;
	className?: string;
};

export function ProfileAvatar({
	url,
	displayName,
	className,
}: ProfileAvatarProps) {
	const initials =
		displayName
			?.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase() ?? '??';

	return (
		<Avatar alt={`${displayName} avatar`} className={className}>
			<AvatarImage src={url ?? ''} />
			<AvatarFallback className='bg-secondary'>
				<Text>{initials}</Text>
			</AvatarFallback>
		</Avatar>
	);
}
