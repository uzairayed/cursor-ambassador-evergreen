/**
 * Flat Cursor-style cards: hairline border, no colored glow.
 * Prefer these over ad-hoc hover:shadow-[0_0_30px_…] washes.
 */

export const cardBase =
	'relative overflow-hidden bg-cursor-surface border border-cursor-border rounded-md transition-colors duration-200';

export const cardHover = 'hover:border-cursor-border-emphasis';

export const cardInteractive = `${cardBase} ${cardHover}`;

/** Featured / accent-rail event card */
export const cardFeatured =
	'relative overflow-hidden bg-cursor-surface border border-cursor-border border-l-2 border-l-cursor-accent-blue rounded-md';

/** Ambassador / partner tile on darker ground */
export const cardTile =
	'bg-cursor-bg-dark border border-cursor-border rounded-md transition-colors duration-200 hover:border-cursor-border-emphasis';
