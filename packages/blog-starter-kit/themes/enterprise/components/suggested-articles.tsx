import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PostFragment } from '../generated/graphql';
import { DEFAULT_COVER } from '../utils/const';
import { CoverImage } from './cover-image';
import { DateFormatter } from './date-formatter';

const HISTORY_KEY = 'hn_read_history';
const MAX_HISTORY = 50;

function getReadHistory(): string[] {
	try {
		return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
	} catch {
		return [];
	}
}

function addToHistory(slug: string) {
	try {
		const history = getReadHistory();
		if (!history.includes(slug)) {
			const updated = [slug, ...history].slice(0, MAX_HISTORY);
			localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
		}
	} catch {
		// localStorage unavailable
	}
}

type Props = {
	posts: PostFragment[];
	currentSlug: string;
};

export const SuggestedArticles = ({ posts, currentSlug }: Props) => {
	const [orderedPosts, setOrderedPosts] = useState<PostFragment[]>(posts);

	useEffect(() => {
		// Record the current article as read
		addToHistory(currentSlug);

		// Reorder suggestions: unread articles first
		const history = getReadHistory();
		const unread = posts.filter((p) => !history.includes(p.slug));
		const read = posts.filter((p) => history.includes(p.slug));
		setOrderedPosts([...unread, ...read]);
	}, [currentSlug, posts]);

	if (!orderedPosts || orderedPosts.length === 0) return null;

	const history = typeof window !== 'undefined' ? getReadHistory() : [];

	return (
		<div className="mx-auto w-full max-w-screen-lg px-5 py-10">
			<h2 className="mb-8 text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-neutral-50 lg:text-2xl">
				You Might Also Like
			</h2>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{orderedPosts.map((post) => {
					const postURL = `/${post.slug}`;
					const coverSrc = resizeImage(
						post.coverImage?.url,
						{ w: 400, h: 210, c: 'thumb' },
						DEFAULT_COVER,
					);
					const isRead = history.includes(post.slug);
					return (
						<div
							key={post.slug}
							className="relative flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
						>
							{!isRead && (
								<span className="absolute right-3 top-3 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
									New
								</span>
							)}
							<Link href={postURL} className="overflow-hidden rounded-lg">
								<CoverImage title={post.title} src={coverSrc} />
							</Link>
							<div className="flex flex-col gap-2">
								<h3 className="text-base font-semibold leading-snug text-slate-800 dark:text-neutral-50">
									<Link
										href={postURL}
										className="hover:text-primary-600 dark:hover:text-primary-500 hover:underline"
									>
										{post.title}
									</Link>
								</h3>
								<p className="line-clamp-2 text-sm text-slate-500 dark:text-neutral-400">
									{post.brief}
								</p>
								<div className="text-xs font-medium text-slate-400 dark:text-neutral-500">
									<DateFormatter dateString={post.publishedAt} />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
