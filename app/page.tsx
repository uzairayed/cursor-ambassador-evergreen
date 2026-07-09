import React from 'react';
import Navbar from '@/components/Navbar';
import HeroHeaderServer from '@/components/HeroHeaderServer';
import AmbassadorSection from '@/components/AmbassadorSection';
import FeaturedSection from '@/components/FeaturedSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import PastEvents from '@/components/PastEvents';
import GlobalEvents from '@/components/GlobalEvents';
import SectionDivider from '@/components/SectionDivider';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import MatchmakingSection from '@/components/MatchmakingSection';
import PhotoDisclaimer from '@/components/PhotoDisclaimer';
import LumaCalendarSection from '@/components/LumaCalendar';
import CommunityTweets from '@/components/CommunityTweets';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';

function buildHomeJsonLd() {
	const org = {
		'@type': 'Organization',
		name: siteConfig.communityName,
		url: siteConfig.cursorCommunityUrl,
	};

	const eventItems = upcomingEvents
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

const Home: React.FC = () => (
	<main className="min-h-screen bg-cursor-bg text-cursor-text scroll-smooth">
		<JsonLd data={buildHomeJsonLd()} />
		<Navbar />
		<HeroHeaderServer />

		<div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
			<AmbassadorSection />
			<SectionDivider />
			<FeaturedSection />
			<SectionDivider />
			<UpcomingEvents />
			{siteConfig.sections.matchmaking ? (
				<>
					<MatchmakingSection />
					<SectionDivider />
				</>
			) : null}
			{siteConfig.sections.photoDisclaimer ? (
				<>
					<PhotoDisclaimer />
					<SectionDivider />
				</>
			) : null}
			<LumaCalendarSection />
			<SectionDivider />
			<PastEvents />
			{siteConfig.sections.communityTweets ? (
				<>
					<SectionDivider />
					<CommunityTweets />
				</>
			) : null}
			<SectionDivider />
			<GlobalEvents />
			<Footer />
		</div>
	</main>
);

export default Home;
