'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { upcomingEvents } from '@/content/events';
import { useI18n } from '@/lib/i18n';
import { Badge, Button, TextLink, cardFeatured } from '@/components/ui';

const UpcomingEvents: React.FC = () => {
	const { t } = useI18n();

	if (upcomingEvents.length === 0) {
		return null;
	}

	const [featured, ...rest] = upcomingEvents;
	const city = featured.location.split(',')[0].trim();

	return (
		<motion.section
			id="upcoming"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16 scroll-mt-20"
		>
			<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2">
				{t('home.upcomingEvents')}
			</p>
			<h2 className="text-2xl md:text-3xl font-normal tracking-tight text-cursor-text mb-6">
				{t('home.upcomingHeading')}
			</h2>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-50px' }}
				transition={{ duration: 0.4 }}
				className={`${cardFeatured} p-5 mb-6`}
			>
				<div className="flex items-center gap-2 text-sm text-cursor-text-muted mb-2">
					<span className="relative flex h-2.5 w-2.5">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cursor-accent-blue opacity-75" />
						<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cursor-accent-blue" />
					</span>
					<span>{featured.displayDate}</span>
					<span className="text-cursor-text-faint">&middot;</span>
					<span>{city}</span>
				</div>
				<h3 className="text-2xl font-normal tracking-tight text-cursor-text mb-3">{featured.title}</h3>
				{featured.lumaUrl ? (
					<Button href={featured.lumaUrl} external variant="accent" size="md">
						{t('home.register')}
					</Button>
				) : (
					<Badge variant="neutral">{t('home.comingSoon')}</Badge>
				)}
			</motion.div>

			{rest.length > 0 && (
				<div className="divide-y divide-cursor-border">
					{rest.map((event, index) => {
						const eventCity = event.location.split(',')[0].trim();

						return (
							<motion.div
								key={event.id}
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{ duration: 0.4, delay: index * 0.08 }}
								className="py-3 first:pt-0 last:pb-0"
							>
								<div className="flex items-start gap-4">
									<span className="text-sm font-medium text-cursor-text-muted w-28 flex-shrink-0 pt-0.5">
										{event.displayDate}
									</span>
									<div className="flex-1 min-w-0">
										<h3 className="text-cursor-text font-medium text-sm">{event.title}</h3>
										<div className="flex items-center gap-2 mt-1">
											<span className="text-xs text-cursor-text-muted">{eventCity}</span>
											{event.lumaUrl ? (
												<>
													<span className="text-cursor-text-faint">&middot;</span>
													<TextLink href={event.lumaUrl} external className="text-xs">
														{t('home.register')}
													</TextLink>
												</>
											) : (
												<>
													<span className="text-cursor-text-faint">&middot;</span>
													<span className="text-xs text-cursor-text-muted">{t('home.comingSoon')}</span>
												</>
											)}
										</div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			)}
		</motion.section>
	);
};

export default UpcomingEvents;
