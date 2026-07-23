import React from 'react';
import Navbar from '@/components/Navbar';
import HeroHeaderServer from '@/components/HeroHeaderServer';
import AmbassadorSection from '@/components/AmbassadorSection';
// import FeaturedSection from '@/components/FeaturedSection'; // restore when community resources are ready
import UpcomingEvents from '@/components/UpcomingEvents';
import PastEvents from '@/components/PastEvents';
import GlobalEvents from '@/components/GlobalEvents';
import SectionDivider from '@/components/SectionDivider';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import MatchmakingSection from '@/components/MatchmakingSection';
import PhotoDisclaimer from '@/components/PhotoDisclaimer';
import LumaCalendarSection from '@/components/LumaCalendar';
import CommunityTweetsSection from '@/components/CommunityTweetsSection';
import { siteConfig } from '@/content/site.config';
import { getEvents } from '@/lib/luma';
import { CursorEvent } from '@/lib/types';
import { MarketingColumn, MarketingGrid } from '@/components/layout/MarketingGrid';

function buildHomeJsonLd(upcoming: CursorEvent[]) {
	const org = {
		'@type': 'Organization',
		name: siteConfig.communityName,
		url: siteConfig.cursorCommunityUrl,
	};

	const eventItems = upcoming
		.filter((event) => event.date)
		.map((event) => ({
			'@type': 'Event',
			name: event.title,
			startDate: event.date,
			location: {
				'@type': 'Place',
				name: event.location,
			},
			organizer: org,
			...(event.lumaUrl ? { url: event.lumaUrl } : {}),
			eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
			eventStatus: 'https://schema.org/EventScheduled',
		}));

	return {
		'@context': 'https://schema.org',
		'@graph': [org, ...eventItems],
	};
}

type GridSectionProps = {
	children: React.ReactNode;
	width?: 'full' | 'wide' | 'reading' | 'prose';
};

function GridSection({ children, width = 'wide' }: GridSectionProps) {
	return (
		<MarketingGrid>
			<MarketingColumn width={width}>{children}</MarketingColumn>
		</MarketingGrid>
	);
}

function hasPastRecaps(events: CursorEvent[]) {
	return events.some((event) => event.thumbnail || event.recapPath);
}

export default async function Home() {
	const { upcoming, past } = await getEvents();

	const showUpcoming = upcoming.length > 0;
	const showMatchmaking = siteConfig.sections.matchmaking;
	const showPhotoDisclaimer = siteConfig.sections.photoDisclaimer;
	const showLumaCalendar = siteConfig.sections.lumaCalendar && Boolean(siteConfig.lumaCalendarEmbedUrl);
	const showPast = hasPastRecaps(past);
	const showTweets = siteConfig.sections.communityTweets;

	// Build the same section order as the evergreen template, but skip empty
	// optional blocks so orphaned dividers don't create large blank gaps.
	const blocks: React.ReactNode[] = [
		<GridSection key="ambassadors">
			<AmbassadorSection />
		</GridSection>,
		// Community resources — restore when ready:
		// <GridSection key="featured" width="reading">
		// 	<FeaturedSection />
		// </GridSection>,
	];

	if (showUpcoming) {
		blocks.push(
			<GridSection key="upcoming">
				<UpcomingEvents events={upcoming} />
			</GridSection>,
		);
	}

	if (showMatchmaking) {
		blocks.push(
			<GridSection key="matchmaking" width="reading">
				<MatchmakingSection />
			</GridSection>,
		);
	}

	if (showPhotoDisclaimer) {
		blocks.push(
			<GridSection key="photo-disclaimer" width="reading">
				<PhotoDisclaimer />
			</GridSection>,
		);
	}

	if (showLumaCalendar) {
		blocks.push(
			<GridSection key="luma-calendar">
				<LumaCalendarSection />
			</GridSection>,
		);
	}

	if (showPast) {
		blocks.push(
			<GridSection key="past">
				<PastEvents events={past} />
			</GridSection>,
		);
	}

	if (showTweets) {
		blocks.push(
			<GridSection key="tweets">
				<CommunityTweetsSection />
			</GridSection>,
		);
	}

	blocks.push(
		<GridSection key="global">
			<GlobalEvents />
		</GridSection>,
	);

	return (
		<main className="min-h-screen scroll-smooth bg-cursor-bg text-cursor-text">
			<JsonLd data={buildHomeJsonLd(upcoming)} />
			<Navbar />
			<HeroHeaderServer />

			<div className="py-20 md:py-28">
				{blocks.flatMap((block, index) =>
					index === 0
						? [block]
						: [
								<GridSection key={`divider-${index}`}>
									<SectionDivider />
								</GridSection>,
								block,
							],
				)}
			</div>
			<Footer nextEvent={upcoming[0]} />
		</main>
	);
}
