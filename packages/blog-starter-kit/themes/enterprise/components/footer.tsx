import Link from 'next/link';
import Image from 'next/image';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Footer = () => {
	const { publication } = useAppContext();

	return (
		<footer className="pt-16 pb-8 border-t dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50 border-t-slate-200 transition-colors duration-300">
			<Container className="px-5">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
					{/* Column 1: Brand & About */}
					<div className="flex flex-col gap-6 md:col-span-4">
						<div className="flex items-center gap-3">
							<span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
								{publication.title}
							</span>
						</div>
						<p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
							A digital garden where I plant ideas, share thoughts on DevOps, cloud infrastructure, open-source, and my journey in tech. Keep exploring and happy automating!
						</p>
						<div className="mt-2">
							<SocialLinks isSidebar={true} />
						</div>
					</div>

					{/* Column 2: Quick Links */}
					<div className="flex flex-col gap-6 md:col-span-2">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-slate-900 dark:text-white">
							Quick Links
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-neutral-400">
							<li>
								<Link href="/" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
									Home
								</Link>
							</li>
							<li>
								<a href="https://muhamaddani.my.id" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
									Portfolio
								</a>
							</li>
							<li>
								<a href="https://github.com/mdrdani" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
									Projects
								</a>
							</li>
							<li>
								<Link href="/rss.xml" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
									RSS Feed
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 3: Topics/Categories */}
					<div className="flex flex-col gap-6 md:col-span-3">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-slate-900 dark:text-white">
							Explore Topics
						</h3>
						<div className="flex flex-wrap gap-2 text-sm">
							<span className="px-3 py-1 bg-white border rounded-full text-slate-600 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors cursor-pointer">
								Web Development
							</span>
							<span className="px-3 py-1 bg-white border rounded-full text-slate-600 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors cursor-pointer">
								React
							</span>
							<span className="px-3 py-1 bg-white border rounded-full text-slate-600 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors cursor-pointer">
								Next.js
							</span>
							<span className="px-3 py-1 bg-white border rounded-full text-slate-600 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors cursor-pointer">
								Golang
							</span>
							<span className="px-3 py-1 bg-white border rounded-full text-slate-600 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors cursor-pointer">
								Open Source
							</span>
							<span className="px-3 py-1 bg-white border rounded-full text-slate-600 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors cursor-pointer">
								Tutorials
							</span>
						</div>
					</div>

					{/* Column 4: Supported By */}
					<div className="flex flex-col gap-6 md:col-span-3">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-slate-900 dark:text-white">
							Supported By
						</h3>
						<div className="flex flex-col gap-4 mt-2">
							<a
								href="https://codeathome.id/id"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 transition-all duration-300 rounded-lg hover:opacity-80"
							>
								<div className="relative w-56 h-16">
									<Image
										src="/assets/blog/codeathome.png"
										alt="Codeathome"
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-contain object-left drop-shadow-sm"
									/>
								</div>
							</a>
							<a
								href="https://lampungdev.org/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 transition-all duration-300 rounded-lg hover:opacity-80"
							>
								<div className="relative w-40 h-10">
									<Image
										src="/assets/blog/lampungdev.png"
										alt="LampungDev"
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-contain object-left drop-shadow-sm"
									/>
								</div>
							</a>
						</div>
					</div>
				</div>

				{/* Bottom section */}
				<div className="flex flex-col items-center justify-between gap-4 pt-8 mt-12 border-t md:flex-row border-slate-200 dark:border-neutral-800/80">
					<p className="flex items-center gap-2 text-sm text-slate-600 dark:text-neutral-400">
						<span>Made with</span>
						<span className="text-red-500 animate-pulse">♥</span>
						<span>&copy; {new Date().getFullYear()} Muhamad Dani Ramanda</span>
					</p>
					
					<div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-neutral-500">
						<span>
							Powered by{' '}
							<a
								href="https://hashnode.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Hashnode
							</a>
						</span>
						<span className="hidden md:inline">•</span>
						<span>
							Hosted on{' '}
							<a
								href="https://vercel.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Vercel
							</a>
						</span>
					</div>
				</div>
			</Container>
		</footer>
	);
};
