import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
import { PublicationLogo } from './publication-logo';
import PublicationSidebar from './sidebar';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const Header = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 6);
	const hiddenItems = navbarItems.slice(6);

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	const navList = (
		<ul className="flex flex-row items-center gap-2 text-slate-700 dark:text-slate-200">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="group relative block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400"
					>
						{item.label}
						<span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-200 group-hover:w-full dark:bg-blue-400"></span>
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="relative px-2 py-0.5 text-xs font-medium transition-all duration-200 rounded group hover:text-blue-600 dark:hover:text-blue-400">
								More
								<span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-200 group-hover:w-full dark:bg-blue-400"></span>
							</button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="z-[100] w-40 p-1 border rounded-md shadow-lg animate-in fade-in-0 zoom-in-95 border-slate-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
								align="end"
								sideOffset={4}
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="block px-2 py-1.5 text-xs font-medium truncate transition-colors duration-150 rounded text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<header className="sticky top-0 z-50 border-b shadow-sm bg-white/80 backdrop-blur-md dark:bg-neutral-900/80 dark:border-neutral-800">
			<Container className="grid grid-cols-4 gap-2 px-5 py-1.5">
				<div className="flex flex-row items-center flex-1 col-span-2 gap-1.5 lg:col-span-1">
					<div className="lg:hidden">
						<Button
							type="outline"
							label=""
							icon={<HamburgerSVG className="w-4 h-4 stroke-current" />}
							className="rounded border-slate-300 !px-1.5 !py-1 text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:border-neutral-700 dark:text-slate-200 dark:hover:bg-neutral-800"
							onClick={toggleSidebar}
						/>

						{isSidebarVisible && (
							<PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
						)}
					</div>
					<div className="hidden lg:block">
						<PublicationLogo />
					</div>
				</div>
				<div className="flex flex-row items-center justify-end col-span-2 gap-3 text-slate-300 lg:col-span-3">
					<nav className="hidden lg:block">{navList}</nav>
				</div>
			</Container>
			<div className="flex justify-center py-1.5 border-t border-slate-100 lg:hidden dark:border-neutral-800">
				<PublicationLogo />
			</div>
		</header>
	);
};
