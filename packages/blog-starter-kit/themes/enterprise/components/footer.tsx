import Link from 'next/link';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Footer = () => {
	return (
		<footer className="py-10 border-t dark:border-neutral-800">
			<Container className="px-5">
				<div className="flex flex-col items-center gap-2 text-center text-slate-600 dark:text-neutral-300">
					<p>&copy; {new Date().getFullYear()} by Muhamad Dani Ramanda</p>
					<p className="text-sm">
						Hosting on{' '}
						<a
							href="https://vercel.com"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium hover:underline"
						>
							Vercel (Hobby Plan)
						</a>
						{' '}and{' '}
						<a
							href="https://hashnode.com"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium hover:underline"
						>
							Headless Hashnode
						</a>
					</p>
				</div>
			</Container>
		</footer>
	);
};
