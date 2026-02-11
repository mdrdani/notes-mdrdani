import { PostFullFragment } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';
import { useState, useEffect } from 'react';

type TableOfContentsItem = PostFullFragment['features']['tableOfContents']['items'][number];

const mapTableOfContentItems = (toc: TableOfContentsItem[]) => {
	try {
		// `toc` is sometimes an array of arrays or an array of objects. Hashnode is trying to investigate this issue.
		// Meanwhile, we can use the following code to map the table of content items to handle both cases.
		return (toc ?? []).map((tocItem) => {
			const item = Array.isArray(tocItem) ? tocItem[0] : tocItem;
			return {
				id: item.id,
				level: item.level,
				slug: item.slug,
				title: item.title,
				parentId: item.parentId ?? null,
			};
		});
	} catch (error) {
		console.error('Error while mapping table of content items', {
			error,
		});
		return [];
	}
};

const Toc = ({
	data,
	parentId,
	onClick,
}: {
	data: TableOfContentsItem[];
	parentId: TableOfContentsItem['parentId'];
	onClick?: () => void;
}) => {
	const children = data.filter((item) => item.parentId === parentId);
	if (children.length === 0) return null;
	return (
		<ul className="mt-2 flex flex-col gap-1.5 md:gap-2 pl-2 md:pl-3 text-xs md:text-sm font-medium text-slate-700 dark:text-neutral-300">
			{children.map((item) => (
				<li key={item.id}>
					<a
						href={`#heading-${item.slug}`}
						className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 leading-relaxed"
						onClick={onClick}
					>
						{item.title}
					</a>

					<Toc data={data} parentId={item.id} onClick={onClick} />
				</li>
			))}
		</ul>
	);
};

export const PostTOC = () => {
	const { post } = useAppContext();
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	// Lock body scroll when drawer is open
	useEffect(() => {
		if (isMobileOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMobileOpen]);

	if (!post) return null;

	return (
		<>
			{/* Desktop TOC - Sidebar */}
			<aside className="hidden lg:block lg:sticky lg:top-20 lg:w-72 lg:flex-shrink-0 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
				<div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900/50">
					<h2 className="mb-3 text-base font-bold text-slate-900 dark:text-neutral-50">Table of contents</h2>
					<Toc parentId={null} data={mapTableOfContentItems(post.features.tableOfContents.items)} />
				</div>
			</aside>

			{/* Mobile TOC - Toggle Button */}
			<button
				onClick={() => setIsMobileOpen(!isMobileOpen)}
				className="fixed bottom-6 left-6 z-50 lg:hidden flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 active:scale-95"
				aria-label="Toggle Table of Contents"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					{isMobileOpen ? (
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					) : (
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
					)}
				</svg>
			</button>

			{/* Mobile TOC - Drawer */}
			{isMobileOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
						onClick={() => setIsMobileOpen(false)}
					/>

					{/* Drawer */}
					<div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden max-h-[75vh] overflow-hidden rounded-t-3xl border-t border-slate-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 animate-in slide-in-from-bottom duration-300">
						{/* Drag Handle */}
						<div className="flex justify-center pt-3 pb-2">
							<div className="w-12 h-1 bg-slate-300 rounded-full dark:bg-neutral-700"></div>
						</div>

						<div className="px-5 pb-5 max-h-[calc(75vh-3rem)] overflow-y-auto">
							<div className="flex items-center justify-between mb-4 sticky top-0 bg-white dark:bg-neutral-900 pb-3 border-b border-slate-100 dark:border-neutral-800">
								<h2 className="text-lg font-bold text-slate-900 dark:text-neutral-50">Table of contents</h2>
								<button
									onClick={() => setIsMobileOpen(false)}
									className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
									aria-label="Close"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<Toc parentId={null} data={mapTableOfContentItems(post.features.tableOfContents.items)} onClick={() => setIsMobileOpen(false)} />
						</div>
					</div>
				</>
			)}
		</>
	);
};
