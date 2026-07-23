import type { Metadata } from 'next';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import { faqs } from '@/content/faqs';
import { siteConfig } from '@/content/site.config';
import { MarketingColumn, MarketingGrid } from '@/components/layout/MarketingGrid';

const title = 'FAQ';
const description = `Common questions about ${siteConfig.communityName} meetups and community events.`;

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
	},
};

function buildFaqJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};
}

export default function FaqPage() {
	return (
		<main className="min-h-screen bg-cursor-bg text-cursor-text">
			{faqs.length > 0 && <JsonLd data={buildFaqJsonLd()} />}
			<Navbar />
			<MarketingGrid className="py-12 md:py-20">
				<MarketingColumn width="reading">
					<FaqSection />
				</MarketingColumn>
			</MarketingGrid>
			<Footer />
		</main>
	);
}
