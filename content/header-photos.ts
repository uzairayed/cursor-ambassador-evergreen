import { BentoImage } from '@/lib/types';

// Pinned to a visible first-row hero tile (not shuffled).
export const pinnedFirstRowPhoto: BentoImage = {
	src: '/images/events/pakistan-flag.jpg',
	alt: 'Flag of Pakistan',
};

// REPLACE: Add real event/city images for your community. Layout slots live in bento-slots.ts;
// images shuffle daily into those fixed slots on the server.
export const headerPhotoPool: BentoImage[] = [
	{
		src: '/images/events/hero-01.jpg',
		alt: 'Cursor community members collaborating at a Pakistan meetup',
	},
	{
		src: '/images/events/hero-02.jpg',
		alt: 'Cursor meetup attendees working together',
	},
	{
		src: '/images/events/hero-03.jpg',
		alt: 'Cursor community gathering',
	},
	{
		src: '/images/events/hero-04.jpg',
		alt: 'Cursor workshop discussion in progress',
	},
	{
		src: '/images/events/hero-05.jpg',
		alt: 'Cursor meetup attendees in conversation',
	},
	{
		src: '/images/events/hero-06.jpg',
		alt: 'Cursor community event moment',
	},
	{
		src: '/images/events/hero-07.jpg',
		alt: 'Cursor event participants gathered around laptops',
	},
];
