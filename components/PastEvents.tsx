'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users } from 'lucide-react';
import { pastEvents } from '@/content/events';
import { useI18n } from '@/lib/i18n';
import { cardInteractive } from '@/components/ui';

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PastEvents: React.FC = () => {
	const { t } = useI18n();

	if (pastEvents.length === 0) {
		return null;
	}

	return (
		<motion.section
			id="recaps"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16 scroll-mt-20"
		>
			<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2">{t('home.pastEvents')}</p>
			<h2 className="text-2xl md:text-3xl font-normal tracking-tight text-cursor-text mb-6">
				{t('home.pastEventsHeading')}
			</h2>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-50px' }}
				className="space-y-6 -mx-3 sm:mx-0"
			>
				{pastEvents.map((event) => {
					if (!event.recapPath) return null;

					const hasGallery = event.galleryImages && event.galleryImages.length > 0;

					return (
						<motion.div key={event.id} variants={itemVariants}>
							<Link href={event.recapPath} className="block group">
								<div className={`${cardInteractive} rounded-none sm:rounded-md`}>
									{event.thumbnail ? (
										<div className="relative">
											<div className={`aspect-[2/1] overflow-hidden ${hasGallery ? 'grid grid-cols-3 gap-1' : ''}`}>
												<div className={`relative ${hasGallery ? 'col-span-2' : ''}`}>
													<Image
														src={event.thumbnail}
														alt={event.title}
														fill
														className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
														sizes="(max-width: 768px) 100vw, 60vw"
													/>
												</div>
												{hasGallery &&
													event.galleryImages!.slice(0, 2).map((img, i) => (
														<div key={i} className="relative">
															<Image
																src={img}
																alt=""
																fill
																className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
																sizes="(max-width: 768px) 33vw, 20vw"
															/>
														</div>
													))}
											</div>
											{event.host ? (
												<div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
													<Image
														src={event.host.logo}
														alt={event.host.name}
														width={20}
														height={20}
														className="rounded-full"
													/>
													<span className="text-xs text-white">{event.host.name}</span>
												</div>
											) : null}
										</div>
									) : null}

									<div className="px-5 py-4">
										<h3 className="text-lg text-cursor-text font-medium mb-1.5">{event.title}</h3>
										<div className="flex flex-wrap items-center gap-3 text-sm text-cursor-text-muted mb-1.5">
											<div className="flex items-center gap-1.5">
												<Calendar className="w-4 h-4" />
												<span>{event.displayDate}</span>
											</div>
											{event.attendees ? (
												<div className="flex items-center gap-1.5">
													<Users className="w-4 h-4" />
													<span>{t('home.attendees', { count: String(event.attendees) })}</span>
												</div>
											) : null}
										</div>
										<div className="flex items-center gap-1 text-sm text-cursor-accent-orange">
											<span>{t('home.viewRecap')}</span>
											<span
												className="translate-y-px group-hover:translate-x-0.5 transition-transform duration-200"
												aria-hidden="true"
											>
												→
											</span>
										</div>
									</div>
								</div>
							</Link>
						</motion.div>
					);
				})}
			</motion.div>
		</motion.section>
	);
};

export default PastEvents;
