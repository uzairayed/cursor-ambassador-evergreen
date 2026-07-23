// REPLACE: Update these values for your local Cursor community.
export const siteConfig = {
	communityName: 'Cursor Pakistan',
	communityNameLocal: 'Pakistan',
	city: 'Islamabad',
	country: 'Pakistan',
	lumaUrl: 'https://luma.com/cursor-pakistan',
	// REPLACE: Paste your Luma calendar embed URL from Luma → Calendar → Embed. Leave empty to hide the calendar section.
	lumaCalendarEmbedUrl: '',
	cursorCommunityUrl: 'https://cursor.com/community',
	defaultLocale: 'en',
	locales: ['en'],
	footerTagline: 'Made with Cursor by ambassadors in Pakistan',
	/** Short site description for <meta>, Open Graph, and Twitter cards. Keep it concrete. */
	description: 'Cursor meetups, workshops, and event recaps across Pakistan.',
	/** Path under /public for the default 1200×630 share image. */
	ogImage: '/og.jpg',
	sections: {
		matchmaking: false,
		photoDisclaimer: false,
		lumaCalendar: false,
		communityTweets: false,
	},
};

export type SiteConfig = typeof siteConfig;
