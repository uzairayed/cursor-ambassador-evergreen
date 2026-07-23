import { RecapData } from '@/lib/types';

// REPLACE: Copy this file, rename the slug, and replace all sample recap content.
// All subsections (speakers, projects, highlights, resources) are optional —
// include only the ones relevant to your event.
export const exampleEventRecap: RecapData = {
	slug: 'example-event',
	title: 'Cafe Cursor Pakistan - Recap',
	date: 'February 14, 2026',
	attendees: 38,
	summary: [
		'Builders joined for a collaborative, practical day of AI-assisted development with Cursor.',
		'People shared workflows, paired on projects, and exchanged tips that can be reused by future communities.',
	],
	host: {
		name: 'Host Venue',
		logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format&fit=crop',
		url: 'https://example.com/venue',
	},

	// Speakers — who presented at the event and what they talked about
	speakers: [
		{
			name: 'Jane Doe',
			topic: 'Building full-stack apps with Cursor and Claude',
			photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
			url: 'https://example.com/jane',
		},
		{
			name: 'Alex Chen',
			topic: 'From zero to deployed: a live coding session',
		},
	],

	// Projects — what attendees built or showcased
	projects: [
		{
			name: 'CursorBot',
			description: 'A Slack bot built entirely with Cursor that answers team questions using internal docs.',
			author: 'Jane Doe',
			url: 'https://github.com/example/cursorbot',
		},
		{
			name: 'LocalMenu',
			description: 'A restaurant menu app scaffolded live during the event in under 30 minutes.',
			author: 'Alex Chen',
		},
	],

	// Highlights — memorable quotes, feedback, or stories from attendees
	highlights: [
		{
			quote: 'I shipped more in this 3-hour session than in my last sprint.',
			author: 'An attendee',
		},
		{
			quote: "Best community event I've been to — everyone was building, not just watching.",
		},
	],

	// Resources — slides, repos, or links shared during the event
	resources: [
		{ label: 'Workshop slides', url: 'https://example.com/slides' },
		{ label: 'Starter template repo', url: 'https://github.com/example/starter' },
	],

	photoCredits: [{ name: 'Community Volunteer' }, { name: 'Photo Partner', url: 'https://example.com/' }],
	photos: [
		{
			src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
			alt: 'Community members coding together',
		},
		{
			src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
			alt: 'Event attendees during workshop',
		},
		{
			src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
			alt: 'Organizer speaking to participants',
		},
	],
};
