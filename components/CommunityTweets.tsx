'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tweet, TweetSkeleton, type TwitterComponents } from 'react-tweet';
import 'react-tweet/theme.css';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui';
import {
	COMMUNITY_TWEET_EMBEDS,
	COMMUNITY_TWEET_MOSAIC_MAX,
	COMMUNITY_TWEET_PAGE_SIZE,
	communityTweetsOnXHref,
	hasCommunityTweetContent,
} from '@/content/community-tweets';

function TweetFallbackLink({ url, note }: { url: string; note?: string }) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex min-h-[120px] flex-col justify-between gap-3 rounded-md border border-cursor-border bg-cursor-bg-dark p-4 text-sm text-cursor-text-secondary transition-colors hover:border-cursor-border-emphasis hover:text-cursor-text"
		>
			<span className="line-clamp-3">{note ?? 'Open this post on X'}</span>
			<span className="inline-flex items-center gap-1.5 text-xs text-cursor-text-muted">
				View on X
				<ExternalLink className="h-3 w-3 opacity-60" />
			</span>
		</a>
	);
}

function tweetComponents(url: string, note?: string): TwitterComponents {
	return {
		TweetNotFound: () => <TweetFallbackLink url={url} note={note} />,
	};
}

function TweetCard({ id, url, note }: { id: string; url: string; note?: string }) {
	return (
		<div className="dark rounded-md border border-cursor-border bg-cursor-bg-dark [&_.react-tweet-theme]:!my-0 [&_.react-tweet-theme]:!mx-0">
			<Tweet
				id={id}
				apiUrl={`/api/tweets/${id}`}
				components={tweetComponents(url, note)}
				fallback={<TweetSkeleton />}
			/>
		</div>
	);
}

export default function CommunityTweets() {
	const { t } = useI18n();
	const mosaicPool = COMMUNITY_TWEET_EMBEDS.slice(0, COMMUNITY_TWEET_MOSAIC_MAX);
	const [visibleCount, setVisibleCount] = useState(Math.min(COMMUNITY_TWEET_PAGE_SIZE, mosaicPool.length));

	if (!hasCommunityTweetContent()) return null;

	const visibleEmbeds = mosaicPool.slice(0, visibleCount);
	const canLoadMore = visibleCount < mosaicPool.length;

	return (
		<motion.section
			id="community-tweets"
			initial={{ opacity: 0, y: 8 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.4 }}
			className="mb-12 md:mb-16"
		>
			<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2">
				{t('home.communityTweets')}
			</p>
			<h2 className="text-2xl md:text-3xl font-normal tracking-tight text-cursor-text mb-6">
				{t('home.communityTweetsHeading')}
			</h2>

			{visibleEmbeds.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
					{visibleEmbeds.map((entry) => (
						<TweetCard key={entry.id} id={entry.id} url={entry.url} note={entry.note} />
					))}
				</div>
			)}

			<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
				{canLoadMore && (
					<Button
						type="button"
						variant="secondary"
						size="md"
						onClick={() => setVisibleCount((count) => Math.min(count + COMMUNITY_TWEET_PAGE_SIZE, mosaicPool.length))}
					>
						{t('home.communityTweetsLoadMore')}
					</Button>
				)}
				<Button href={communityTweetsOnXHref()} external variant="secondary" size="md">
					{t('home.communityTweetsBrowseX')}
					<ExternalLink className="w-3.5 h-3.5 opacity-60" />
				</Button>
			</div>
		</motion.section>
	);
}
