'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { pastEvents } from '@/content/events';
import { useI18n } from '@/lib/i18n';
import { cardInteractive } from '@/components/ui';

const PastEvents: React.FC = () => {
	const { t } = useI18n();

	if (pastEvents.length === 0) {
		return null;
	}

	return (
		<section id="recaps" className="mb-20 scroll-mt-20">
			<p className="cursor-eyebrow mb-2">{t('home.pastEvents')}</p>
			<h2 className="cursor-section-title mb-8 text-cursor-text">{t('home.pastEventsHeading')}</h2>

			<div className="space-y-4">
				{pastEvents.map((event) => {
					if (!event.recapPath) return null;

					return (
						<Link key={event.id} href={event.recapPath} className={`${cardInteractive} group block`}>
							<article className={event.thumbnail ? 'grid md:grid-cols-[240px_minmax(0,1fr)]' : ''}>
								{event.thumbnail ? (
									<div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[160px]">
										<Image
											src={event.thumbnail}
											alt={event.title}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, 240px"
										/>
									</div>
								) : null}
								<div className="flex flex-col justify-between p-5">
									<div>
										<p className="text-sm text-cursor-text-muted">
											{event.displayDate}
											{event.attendees ? ` · ${t('home.attendees', { count: String(event.attendees) })}` : ''}
										</p>
										<h3 className="mt-2 text-xl font-normal tracking-tight text-cursor-text">{event.title}</h3>
										<p className="mt-1 text-sm text-cursor-text-muted">{event.location}</p>
									</div>
									<p className="mt-6 text-sm text-cursor-accent-orange">
										{t('home.viewRecap')} <span aria-hidden="true">→</span>
									</p>
								</div>
							</article>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default PastEvents;
