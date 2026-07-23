import { CursorEvent } from '@/lib/types';
import { eventOverrides, staticPastEvents } from '@/content/events';

interface LumaGeo {
	address?: string;
	city?: string;
	region?: string;
	country?: string;
	city_state?: string;
	full_address?: string;
}

interface LumaEntry {
	api_id: string;
	name: string;
	start_at: string;
	end_at?: string;
	url: string;
	cover_url?: string;
	geo_address_json?: LumaGeo | null;
}

interface LumaResponse {
	entries: LumaEntry[];
	has_more?: boolean;
	next_cursor?: string;
}

const LUMA_ENDPOINT = 'https://api.lu.ma/public/v1/calendar/list-events';

function getLumaApiKeys(): string[] {
	const multi = process.env.LUMA_API_KEYS;
	if (multi) {
		return multi
			.split(',')
			.map((key) => key.trim())
			.filter(Boolean);
	}

	const single = process.env.LUMA_API_KEY?.trim();
	return single ? [single] : [];
}

const slugFromUrl = (url: string): string => {
	try {
		const { pathname } = new URL(url);
		return pathname.replace(/^\/+|\/+$/g, '') || url;
	} catch {
		return url;
	}
};

const formatLocation = (geo?: LumaGeo | null): string => {
	if (!geo) return '';
	if (geo.city_state) return geo.city_state;
	return [geo.city, geo.country].filter(Boolean).join(', ');
};

const formatDisplayDate = (iso: string): string =>
	new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

const toCursorEvent = (entry: LumaEntry): CursorEvent => {
	const slug = slugFromUrl(entry.url);
	const override = eventOverrides[slug] ?? eventOverrides[entry.api_id] ?? {};
	const isPast = new Date(entry.start_at).getTime() < Date.now();

	return {
		id: entry.api_id,
		title: entry.name,
		date: entry.start_at.slice(0, 10),
		displayDate: formatDisplayDate(entry.start_at),
		location: formatLocation(entry.geo_address_json),
		lumaUrl: entry.url,
		status: isPast ? 'past' : 'upcoming',
		thumbnail: override.thumbnail ?? entry.cover_url,
		recapPath: override.recapPath,
		galleryImages: override.galleryImages,
		attendees: override.attendees,
		host: override.host,
	};
};

async function fetchCalendarEntries(apiKey: string): Promise<LumaEntry[]> {
	const entries: LumaEntry[] = [];
	let cursor: string | undefined;

	for (let page = 0; page < 20; page += 1) {
		const url = new URL(LUMA_ENDPOINT);
		if (cursor) url.searchParams.set('pagination_cursor', cursor);

		const res = await fetch(url.toString(), {
			headers: { 'x-luma-api-key': apiKey, accept: 'application/json' },
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			console.error(`[luma] ${res.status} ${res.statusText}`);
			break;
		}

		const data = (await res.json()) as LumaResponse;
		entries.push(...(data.entries ?? []));
		if (!data.has_more || !data.next_cursor) break;
		cursor = data.next_cursor;
	}

	return entries;
}

async function fetchAllLumaEntries(): Promise<LumaEntry[]> {
	const apiKeys = getLumaApiKeys();
	if (apiKeys.length === 0) {
		console.warn('[luma] LUMA_API_KEYS / LUMA_API_KEY not set — returning no events');
		return [];
	}

	const batches = await Promise.all(apiKeys.map((key) => fetchCalendarEntries(key)));
	const byId = new Map<string, LumaEntry>();
	for (const entry of batches.flat()) {
		byId.set(entry.api_id, entry);
	}
	return [...byId.values()];
}

export interface EventBuckets {
	upcoming: CursorEvent[];
	past: CursorEvent[];
}

export async function getEvents(): Promise<EventBuckets> {
	const entries = await fetchAllLumaEntries();
	const events = entries.map(toCursorEvent);

	const byDateAsc = (a: CursorEvent, b: CursorEvent) => (a.date ?? '').localeCompare(b.date ?? '');
	const byDateDesc = (a: CursorEvent, b: CursorEvent) => (b.date ?? '').localeCompare(a.date ?? '');

	const upcoming = events.filter((e) => e.status === 'upcoming').sort(byDateAsc);

	const past = [...events.filter((e) => e.status === 'past'), ...staticPastEvents].sort(byDateDesc);

	return { upcoming, past };
}
