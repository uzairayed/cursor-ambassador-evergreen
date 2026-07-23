import { CursorEvent } from '@/lib/types';

// Events are fetched live from Luma (see `lib/luma.ts`).
// Use this map to attach data Luma does not provide: recap pages, custom
// thumbnails, gallery images, attendee counts, host badges. Key by either:
//   - the Luma URL slug (e.g. 'p8qx3ipe' from https://luma.com/p8qx3ipe), or
//   - the Luma API id (e.g. 'evt-w2rMsoSp4wI0gea')
export type EventOverride = Partial<
	Pick<CursorEvent, 'thumbnail' | 'recapPath' | 'galleryImages' | 'attendees' | 'host'>
>;

export const eventOverrides: Record<string, EventOverride> = {
	// Cursor Meetup Pakistan — Islamabad, 2025-07-04
	p8qx3ipe: {
		thumbnail: '/images/events/islamabad-meetup.jpeg',
		galleryImages: [
			'/images/events/islamabad-meetup-2.jpeg',
			'/images/events/islamabad-meetup-3.jpeg',
		],
	},
	// Cursor Meetup Lahore — 2025-07-26
	xan25r58: {
		thumbnail: '/images/events/lahore-meetup.jpeg',
	},
	// Cursor Pakistan @ GIKI — 2025-11-13
	'1ctyb7w6': {
		thumbnail: '/images/events/cursor-giki.jpeg',
	},
	// Cafe Cursor Lahore — 2025-11-15
	h8hf5u91: {
		thumbnail: '/images/events/cafe-cursor-lahore.jpeg',
	},
	// Cursor Workshop Lahore (rsj2zhqv, 2025-11-14) and Cursor Pakistan @ FAST
	// (pcxcix18, 2025-11-28) intentionally have no overrides — they keep their
	// default Luma cover.
};

// Past events that predate the Luma calendar. Merged into the past-events
// bucket by `lib/luma.ts`.
export const staticPastEvents: CursorEvent[] = [
	{
		id: 'static-cursor-karachi-first',
		title: 'Cursor Meetup Karachi',
		date: '2025-05-15',
		displayDate: 'May 15, 2025',
		location: 'Karachi, Pakistan',
		thumbnail: '/images/events/karachi-first-event.jpeg',
		status: 'past',
	},
	{
		id: 'static-cafe-cursor-karachi',
		title: 'Cafe Cursor Karachi',
		date: '2025-06-15',
		displayDate: 'June 15, 2025',
		location: 'Karachi, Pakistan',
		thumbnail: '/images/events/cafe-cursor-karachi.jpeg',
		status: 'past',
	},
];

// Fallback exports used when LUMA_API_KEY is unset (build/CI, local without key).
export const events: CursorEvent[] = staticPastEvents;
export const upcomingEvents = events.filter((event) => event.status === 'upcoming');
export const pastEvents = events.filter((event) => event.status === 'past');
