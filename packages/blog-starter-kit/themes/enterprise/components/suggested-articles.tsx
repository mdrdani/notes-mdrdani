import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { PostFragment } from '../generated/graphql';
import { DEFAULT_COVER } from '../utils/const';
import { CoverImage } from './cover-image';
import { DateFormatter } from './date-formatter';

type Props = {
	posts: PostFragment[];
};

export const SuggestedArticles = ({ posts }: Props) => {
	if (!posts || posts.length === 0) return null;

	return (
		<div className="mx-auto w-full max-w-screen-lg px-5 py-10">
			<h2 className="mb-8 text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-neutral-50 lg:text-2xl">
				You Might Also Like
			</h2>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{posts.map((post) => {
					const postURL = `/${post.slug}`;
					const coverSrc = resizeImage(
						post.coverImage?.url,
						{ w: 400, h: 210, c: 'thumb' },
						DEFAULT_COVER,
					);
					return (
						<div
							key={post.slug}
							className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
						>
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
