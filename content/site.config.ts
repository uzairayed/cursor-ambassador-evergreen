// REPLACE: Update these values for your local Cursor community.
export const siteConfig = {
	communityName: 'Cursor Community',
	communityNameLocal: 'YourCity',
	city: 'Your City',
	country: 'YourCountry',
	lumaUrl: 'https://lu.ma/cursor-community',
	// REPLACE: Paste your Luma calendar embed URL from Luma → Calendar → Embed. Leave empty to hide the calendar section.
	lumaCalendarEmbedUrl: '',
	cursorCommunityUrl: 'https://cursor.com/community',
	defaultLocale: 'en',
	locales: ['en'],
	footerTagline: 'Made with Cursor by ambassadors worldwide',
	sections: {
		matchmaking: false,
		photoDisclaimer: false,
		lumaCalendar: false,
		communityTweets: false,
	},
};

export type SiteConfig = typeof siteConfig;
