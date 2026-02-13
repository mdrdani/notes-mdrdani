import Link from 'next/link';
import Image from 'next/image';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Footer = () => {
	return (
		<footer className="py-10 border-t dark:border-neutral-800 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-neutral-900/30">
			<Container className="px-5">
				<div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
					{/* Column 1: Supported By Logos */}
					<div className="flex flex-col items-center gap-4">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-neutral-400">
							Supported By
						</h3>
						<div className="flex items-center gap-8">
							<a
								href="https://codeathome.id/id"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-all duration-300 group hover:scale-110"
							>
								<Image
									src="/assets/blog/codeathome.png"
									alt="Codeathome"
									width={130}
									height={130}
									className="transition-all duration-300 drop-shadow-md group-hover:drop-shadow-xl"
								/>
							</a>
							<a
								href="https://lampungdev.org/"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-all duration-300 group hover:scale-110"
							>
								<Image
									src="/assets/blog/lampungdev.png"
									alt="LampungDev"
									width={130}
									height={130}
									className="transition-all duration-300 drop-shadow-md group-hover:drop-shadow-xl"
								/>
							</a>
						</div>
					</div>

					{/* Vertical Divider - Hidden on mobile */}
					<div className="hidden w-px h-24 md:block bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-neutral-700"></div>

					{/* Column 2: Copyright and Hosting Info */}
					<div className="flex flex-col items-center gap-2 text-center text-slate-600 dark:text-neutral-300">
						<p className="flex items-center gap-2">
							<span className="text-sm">Made with</span>
							<span className="text-red-500 animate-pulse">♥</span>
							<span className="text-sm">&copy; {new Date().getFullYear()} Muhamad Dani Ramanda</span>
						</p>
						<p className="text-sm">
							Hosting on{' '}
							<a
								href="https://vercel.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium transition-colors hover:underline hover:text-slate-900 dark:hover:text-neutral-100"
							>
								Vercel (Hobby Plan)
							</a>
							{' '}and{' '}
							<a
								href="https://hashnode.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium transition-colors hover:underline hover:text-slate-900 dark:hover:text-neutral-100"
							>
								Headless Hashnode
							</a>
						</p>
					</div>
				</div>
			</Container>
		</footer>
	);
};
